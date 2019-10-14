var m_settingsData = {};

const CONST_REQUIRED_SETTINGS = [{"name": "music_volume", "default": 1}, {"name": "sound_volume", "default": 1}];

function Settings()
{

}

Settings.Load = function()
{

	DB.LoadSettings();

}

Settings.Populate = function(json)
{

	m_settingsData = json;

	Settings.Ensure();

}

Settings.Ensure = function()
{

	for(var i = 0; i < CONST_REQUIRED_SETTINGS.length; i++)
	{

		if(!m_settingsData.hasOwnProperty(CONST_REQUIRED_SETTINGS[i].name))
		{

			var pair = CONST_REQUIRED_SETTINGS[i];
			m_settingsData[pair.name] = pair.default;

		}

	}

}

Settings.Access = function(key)
{

	return m_settingsData[key];

}

Settings.Change = function(key, value)
{

	m_settingsData[key] = value;

}

Settings.Full = function()
{

	return m_settingsData;

}
