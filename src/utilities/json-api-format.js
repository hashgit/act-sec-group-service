function toJsonApiListFormat(items) {
  if (items) {
    return items.map(item => ({
      type: 'security-group',
      id: item.GroupId,
      attributes: {
        name: item.GroupName,
      }
    }));
  }

  return [];
}

module.exports = toJsonApiListFormat;
