const ipc = require('electron').ipcRenderer;

const channels = require('./Constants');

function DB()
{

}

DB.resources = {};

DB.Prepare = function()
{

	ipc.on(channels.DBReceiveChannel, function(event, args)
	{

		if(args.error)
		{

			Logger.LogError("Error reading " + args.locator + " from DB: " + args.error);

			return;

		}

		DB.resources[args.locator].Populate(args.json, false);
		delete DB.resources[args.locator];

		GameLoaded();

	});

}

DB.LoadSettings = function()
{

	ipc.on(channels.SettingsReceiveChannel, function(event, args)
	{

		if(args.error)
		{

			Logger.LogError("Error reading user settings: " + args.error);

		}

		DB.resources[SETTINGS_KEY](args.json);
		delete DB.resources[SETTINGS_KEY];

	});

	DB.resources[SETTINGS_KEY] = Settings.Populate;

	ipc.send(channels.SettingsSendChannel, "Load");

}			

DB.SaveSettings = function()
{
}

DB.LoadImage = function(locator, caller)
{

	DB.resources[locator] = caller;

	ipc.send(channels.ImageSendChannel, locator);

}

DB.LoadResource = function(locator, caller)
{

	DB.resources[locator] = caller;

	ipc.send(channels.DBSendChannel, locator);

}
