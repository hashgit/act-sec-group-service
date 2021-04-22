const { LexModelBuildingService } = require('aws-sdk');
const AWS = require('aws-sdk');
const LogService = require('./log-service');

class SecurityGroupService {
  constructor ({ log, ec2 }) {
    this.log = log || new LogService();
    this.ec2 = new AWS.EC2();
  }

  async getGroups() {
    const { SecurityGroups } = await this.ec2.describeSecurityGroups().promise();
    return SecurityGroups;
  }
}

module.exports = SecurityGroupService;
