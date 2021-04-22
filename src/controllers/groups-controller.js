const express = require('express');
const SecurityGroupService = require('../services/security-group-service');
const toJsonApiListFormat = require('../utilities/json-api-format');

const router = new express.Router();

router.use((req, res, next) => {
  req.secGroupService = new SecurityGroupService({ log: req.log });
  next();
});

router.get('/', async (req, res) => {
  try {
    const groups = await req.secGroupService.getGroups();
    const response = toJsonApiListFormat(groups);

    return res.json({
      data: response,
    });
  } catch (error) {
    req.log.error('Fetching security groups failed', error);
    return res.status(error.status || 500).json({
      errors: [{
        status: error.status || 500,
        title: error.message,
      }],
    });
  }
});

module.exports = router;
