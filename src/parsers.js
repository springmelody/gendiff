import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  yaml: yaml.safeLoad,
  ini: ini.parse,
};

export default (dataType, data) => parsers[dataType](data);
