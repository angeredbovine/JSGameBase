const CONST_LOADING_SPEED = 1;

var m_loadState = {};
var game_running = false;
var load_order_done = false;

function Prepped()
{

	load_order_done = true;

}

function GameLoaded()
{

	if(load_order_done && !game_running && m_loadState.nextState.Loaded() && SoundManager.Loaded())
	{

		GameLoop(-1, m_loadState.nextState);
		game_running = true;

		m_loadState = m_loadState.nextState;

		ResizeCanvas();

	}

}

function ResizeCanvas()
{

	m_loadState.Resize(window.innerWidth, window.innerHeight);

}

window.addEventListener('resize', function()
{

	ResizeCanvas();

}, true);

function LoadingScreen(state)
{

	State.call(this);
	m_loadState = this;

	this.nextState = state;

	this.progress = 0;
	this.last_progress = 0;

	this.image_master = {};
	this.sheet_master = {};

}

LoadingScreen.prototype = Object.create(State.prototype);
LoadingScreen.prototype.constructor = LoadingScreen;

LoadingScreen.prototype.Loaded = function()
{

	for(var loaded in this.loadOrder)
	{

		if(!this.loadOrder[loaded].Loaded())
		{

			return false;

		}

	}

	this.loadOrder = {};

	this.Start();

	return true;

}

LoadingScreen.prototype.Initialize = function(json)
{

	State.prototype.Initialize.call(this);

	this.nextState.Initialize(json.next);

}

LoadingScreen.prototype.Load = function(json)
{

	this.LoadMaster("image_master", json.images, function(i, loading){ return new ImageResource(); });
	this.LoadMaster("sheet_master", json.sheets, function(i, loading){ return new Spritesheet(); });

	this.sheet_references = json.sheet_references;

	this.nextState.Load(json.next);

}

LoadingScreen.prototype.Start = function()
{

	for(var i = 0; i < json.sheet_references.length; i++)
	{

		this..sheet_references.reference = new SheetReference(this.sheet_master[this.sheet_references[i].reference]);

	}

}

LoadingScreen.prototype.Update = function(delta)
{

	if(this.Loaded() && load_order_done && !this.nextState.Loaded())
	{

		var progress = this.nextState.LoadProgress();

		if(progress.total > 0)
		{

			this.last_progress = this.progress;
			this.progress = (progress.loaded / progress.total);
			
		}

		if(this.last_progress != this.progress)
		{

			this.last_progress += CONST_LOADING_SPEED * delta;
			this.last_progress = Math.min(this.progress, this.last_progress);

		}

		for(var i = 0; i < this.sheet_references.length; i++)
		{

			this.sheet_references[i].reference.Update(delta);

		}


	}	

}

LoadingScreen.prototype.Render = function(delta)
{

	if(this.Loaded())
	{

		this.context.save();
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		var box = new Box(75, (this.canvas.height / 2) - 35, (this.canvas.width - 150), 70);
		var bar = new Box(100, (this.canvas.height / 2) - 25, (this.canvas.width - 200) * this.last_progress, 50);

		box.Render(this.context, "rgba(255, 255, 255, 1)");
		bar.Render(this.context, "rgba(0, 255, 0, 1)");

		this.context.restore();

		for(var i = 0; i < this.sheet_references.length; i++)
		{

			var reference = this.sheet_references[i];

			var data = reference.reference.Data();
			var image = this.image_master[reference.image];

			if(!data)
			{

				Logger.LogError("Attempting to draw invalid spritesheet frame.");

				return;

			}

			context.drawImage(image.Image(), data.box.X(), data.box.Y(), data.box.Width(), data.box.Height(), reference.x - this.reference.scale.y * reference.offset.x, treference.y - reference.scale.y * reference.offset.y, reference.scale.x * data.box.Width(), reference.scale.y * data.box.Height());

		}

	}

}

LoadingScreen.prototype.Pause = function()
{
}

LoadingScreen.prototype.Unpause = function()
{
}

LoadingScreen.prototype.UnpauseCondition = function()
{

	return true;

}

LoadingScreen.prototype.Resize = function(width, height)
{

	this.container.style.width = width + "px";
	this.container.style.height = height + "px";

	this.canvas.width = width;
	this.canvas.height = height;

}
