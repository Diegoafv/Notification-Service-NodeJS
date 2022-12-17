import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRespository } from '@test/repositories/in-memory-notifications-repository';
import { UnreadNotification } from './unread-notification';

describe('Unread notifications', () => {
  test('It should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRespository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationsRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  test('It should not be able to unread a notification that does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationsRespository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'notification-id-example',
      });
    }).rejects.toThrow('Notification not found');
  });
});
