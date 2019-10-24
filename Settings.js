const CONST_REQUIRED_SETTINGS = [{"name": "music_volume", "default": 1, "setter": SoundManager.SetMusicVolume}, {"name": "sound_volume", "default": 1, "setter": SoundManager.SetSoundVolume}];

function Settings()
{

}

Settings.m_settingsData = {};

Settings.Load = function()
{

	DB.LoadSettings();

}

Settings.Populate = function(json)
{

	Settings.m_settingsData = (json ? json : {});

	Settings.Ensure();

}

Settings.Ensure = function()
{

	for(var i = 0; i < CONST_REQUIRED_SETTINGS.length; i++)
	{

		if(!Settings.m_settingsData.hasOwnProperty(CONST_REQUIRED_SETTINGS[i].name))
		{

			var pair = CONST_REQUIRED_SETTINGS[i];
			Settings.m_settingsData[pair.name] = pair.default;

		}

		CONST_REQUIRED_SETTINGS[i].setter(Settings.m_settingsData[CONST_REQUIRED_SETTINGS[i].name]);

	}

}

Settings.Access = function(key)
{

	return Settings.m_settingsData[key];

}

Settings.Change = function(key, value)
{

	Settings.m_settingsData[key] = value;

	for(var i = 0; i < CONST_REQUIRED_SETTINGS.length; i++)
	{

		if(Settings.m_settingsData.hasOwnProperty(CONST_REQUIRED_SETTINGS[i].name))
		{

			CONST_REQUIRED_SETTINGS[i].setter(value);

			return;

		}

	}

}

Settings.Full = function()
{

	return Settings.m_settingsData;

}
