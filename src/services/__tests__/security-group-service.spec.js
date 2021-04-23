const AWSmock = require('aws-sdk-mock');
const SecurityGroupService = require('../security-group-service');

describe("security-group-service", () => {
  describe('success', () => {
    let awsResult = [
      { GroupId: 'group-1', GroupName: 'Group 1' },
      { GroupId: 'group-2', GroupName: 'Group 2' }
    ];
    let service;
  
    beforeEach(() => {
      AWSmock.mock('EC2', 'describeSecurityGroups', (callback) => {
        callback(null, { SecurityGroups: awsResult });
      });
      service = new SecurityGroupService({});
    });

    afterEach(() => {
      AWSmock.restore('EC2');
    });
  
    test("successfully receives groups", async () => {
      const result = await service.getGroups();
      const expected = [{ GroupId: 'group-1', GroupName: 'Group 1'}, { GroupId: 'group-2', GroupName: 'Group 2'}];
      expect(result).toEqual(expected);
    });
  });

  describe('failure', () => {
    let service;
  
    beforeEach(() => {
      AWSmock.mock('EC2', 'describeSecurityGroups', (callback) => {
        callback({ message: 'NotPermitted' });
      });
      service = new SecurityGroupService({});
    });

    afterEach(() => {
      AWSmock.restore('EC2');
    });
  
    it("exception", async () => {
      await expect(() => service.getGroups()).rejects.toHaveProperty('message', 'NotPermitted');
    });
  });
});
