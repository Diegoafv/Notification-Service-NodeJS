import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  test('It should be able to create a new notification', () => {
    const notification = new Notification({
      content: new Content('You have a new friend request!'),
      category: 'social',
      recipientId: 'recipient-id-example',
    });

    expect(notification).toBeTruthy();
  });
});
