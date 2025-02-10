import { NextResponse, NextRequest } from 'next/server';
import dbconnect from '@/lib/db/connect';
import { Order } from '@/lib/db/models/Order';
import { Assignment } from '@/lib/db/models/Assignment';
import { AssignmentMetrics } from '@/lib/db/models/AssignmetnMetrics';

export async function PUT(req: NextRequest) {
    try {
        await dbconnect();
        const id = req.nextUrl.pathname.split('/').pop()
        const { status, reason } = await req.json();

        const validStatuses = ['pending', 'assigned', 'picked', 'delivered'];
        if (!validStatuses.includes(status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }

        const order = await Order.findOne({ orderNumber: id });
        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        const previousStatus = order.status; 
        const today = new Date().toISOString().split('T')[0];

        if (previousStatus === 'assigned' && status === 'pending' && !reason) {
            return NextResponse.json({ error: 'Reason is required for assignment failure' }, { status: 400 });
        }

        order.status = status;
        await order.save();

        let metrics = await AssignmentMetrics.findOne({ date: today });

        if (!metrics) {
            metrics = new AssignmentMetrics({
                date: today,
                totalAssigned: 0,
                success: 0,
                failure: 0,
                successRate: 0,
                failureReasons: [] as { reason: string; count: number }[], 
            });
        }

        if (previousStatus === 'assigned' && status === 'pending') {
            await Assignment.updateOne(
                { orderId: order._id },
                { status: 'failed', reason },
                { new: true }
            );

            metrics.failure += 1; // Increment failure count

            const reasonIndex = metrics.failureReasons.findIndex((r: { reason: string; count: number }) => r.reason === reason);
            if (reasonIndex !== -1) {
                metrics.failureReasons[reasonIndex].count += 1;
            } else {
                metrics.failureReasons.push({ reason, count: 1 });
            }
        } 
        else if (status === 'delivered') {
            await Assignment.updateOne(
                { orderId: order._id },
                { status: 'success' },
                { new: true }
            );

            metrics.success += 1; // Increment success count
        }

        metrics.totalAssigned += 1;

 
        metrics.successRate = metrics.totalAssigned > 0 ? metrics.success / metrics.totalAssigned : 0;

        await metrics.save();

        return NextResponse.json({ message: 'Order status updated successfully', order }, { status: 200 });

    } catch (error) {
        console.error('Error updating order status:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
