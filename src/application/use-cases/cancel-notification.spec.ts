import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRespository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';

describe('Cancel notifications', () => {
  test('It should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRespository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  test('It should not be able to cancel a notification that does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationsRespository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'notification-id-example',
      });
    }).rejects.toThrow('Notification not found');
  });
});
