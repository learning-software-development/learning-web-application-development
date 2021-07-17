import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return ['Bill Gates',
      'Mark Zuckerberg',
      'Paul Allen',
      'Steve Wozniak',
      'Ada Lovelace',
      'Julian Assange',
      'Grace Hopper',
      'Rob Zombie'];
  }
});
