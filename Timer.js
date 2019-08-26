function Timer()
{

	this.start = 0;
	this.pause = 0;
	this.running = 0;

}

var m_globalTimer = new Timer();

Timer.prototype.Time = function()
{

	return Date.now();

}

Timer.Time = function()
{

	return m_globalTimer.Time();

}

Timer.prototype.Reset = function()
{

	this.start = Date.now();
	this.running = this.start;
	this.pause = 0;

}

Timer.Reset = function()
{

	m_globalTimer.Reset();

}

Timer.prototype.LifetimeMilliseconds = function()
{

	return Timer.Time() - this.start;

}

Timer.LifetimeMilliseconds = function()
{

	return m_globalTimer.LifetimeMilliseconds();

}

Timer.prototype.RunningMilliseconds = function()
{

	if(this.pause > 0)
	{

		return this.pause - this.running;

	}

	return Timer.Time() - this.running;

}

Timer.RunningMilliseconds = function()
{

	return m_globalTimer.RunningMilliseconds();

}

Timer.prototype.Pause = function()
{

	this.pause = Timer.Time();

}

Timer.Pause = function()
{

	m_globalTimer.Pause();

}

Timer.prototype.Unpause = function()
{

	this.running = Timer.Time() - Timer.RunningMilliseconds();
	this.pause = 0;

}

Timer.Unpause = function()
{

	m_globalTimer.Unpause();

}
