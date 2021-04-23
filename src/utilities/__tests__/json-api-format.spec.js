const toJsonApiListFormat = require('../json-api-format');

describe('toJsonApiListFormat', () => {
  it('can convert array with items', () => {
    const input = [{
      GroupId: 'group-1',
      GroupName: 'Group 1'
    }];

    const result = toJsonApiListFormat(input);
    expect(result).toEqual([
      { id: 'group-1', type: 'security-group', attributes: { name: 'Group 1' }}
    ]);
  });

  it('can convert empty array', () => {
    const input = [];

    const result = toJsonApiListFormat(input);
    expect(result).toEqual([]);
  });

  it('can convert null array', () => {
    const input = undefined;

    const result = toJsonApiListFormat(input);
    expect(result).toEqual([]);
  });
});
