import { expect } from 'chai';
import { buildJpql, getCompletedTickets } from '../api';

describe('API', () => {
  describe('buildJpql', () => {
    it('works with 0 weeks from today', () => {
      const actual = buildJpql('abc', 0);
      expect(actual).equals('abc AND type != EPIC AND resolutiondate >= startOfWeek() AND status = Done')
    })

    it('works with 2 weeks from today', () => {
      const actual = buildJpql('abc', 2);
      expect(actual).equals('abc AND type != EPIC AND resolutiondate >= startOfWeek(-3w) AND resolutiondate <= startOfWeek(-2w) AND status = Done')
    })
  });

  describe('getCompletedTickets', () => {
    return getCompletedTickets('ted.chen', '64SSNf5v4', 'project in (EL, DV, SER)', 0).then((result) => {
      expect(result).equals('true');
    });
  })
});