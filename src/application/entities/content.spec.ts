import { Content } from './content';

describe('Notification content', () => {
  test('It should be able to create a new notification content', () => {
    const content = new Content('You have a new friend request!');

    expect(content).toBeTruthy();
  });

  test('It should not be able to create a new notification content with less than 5 characters', () => {
    expect(() => new Content('1234')).toThrow();
  });

  test('It should not be able to create a new notification content with more than 255 characters', () => {
    expect(() => new Content('a'.repeat(256))).toThrow();
  });
});
