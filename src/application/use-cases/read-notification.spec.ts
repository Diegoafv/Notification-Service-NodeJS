import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRespository } from '@test/repositories/in-memory-notifications-repository';
import { ReadNotification } from './read-notification';

describe('Read notifications', () => {
  test('It should be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRespository();
    const readNotification = new ReadNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  test('It should not be able to read a notification that does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationsRespository();
    const readNotification = new ReadNotification(notificationsRepository);

    expect(() => {
      return readNotification.execute({
        notificationId: 'notification-id-example',
      });
    }).rejects.toThrow('Notification not found');
  });
});
