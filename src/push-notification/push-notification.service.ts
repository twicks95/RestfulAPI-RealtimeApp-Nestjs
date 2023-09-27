import { Injectable } from '@nestjs/common';
import { Subscription } from '../subcriptions/subscription.interface';
import * as webPush from 'web-push';

@Injectable()
export class PushNotificationService {
    private subscriptions: Subscription[] = [];

    subscribe(subscription: Subscription) {
        this.subscriptions.push(subscription);
        // Store subscription in your database (e.g., MongoDB, Redis)
    }

    unsubscribe(endpoint: string) {
        const index = this.subscriptions.findIndex((sub) => sub.endpoint === endpoint);
        if (index !== -1) {
            this.subscriptions.splice(index, 1);
            // Remove subscription from your database
        }
    }

    getSubscriptions() {
        return this.subscriptions;
    }

    sendNotification(subscription: Subscription, message: string) {
        const payload = JSON.stringify({ title: 'Push Notification', body: message });
        webPush
            .sendNotification(subscription, payload)
            .catch((error) => {
                console.error('Error sending push notification:', error);
            });
    }
}
