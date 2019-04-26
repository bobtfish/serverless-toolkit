const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;

const {
  handler,
  cliInfo,
  describe,
} = require('twilio-run/src/commands/deploy');
const {
  convertYargsOptionsToOclifFlags,
  normalizeFlags,
} = require('../../utils');

class FunctionsDeploy extends TwilioClientCommand {
  constructor(argv, config, secureStorage) {
    super(argv, config, secureStorage);

    this.showHeaders = true;
  }

  async run() {
    await super.run();

    let { flags, args } = this.parse(FunctionsDeploy);
    flags = normalizeFlags(flags);

    if (flags.project) {
      flags.accountSid = flags.accountSid || this.twilioClient.username;
      flags.authToken = flags.authToken || this.twilioClient.password;
    }

    const opts = Object.assign({}, flags, args);
    return handler(opts);
  }
}

FunctionsDeploy.description = describe;

FunctionsDeploy.flags = Object.assign(
  convertYargsOptionsToOclifFlags(cliInfo.options),
  { project: TwilioClientCommand.flags.project }
);

module.exports = FunctionsDeploy;