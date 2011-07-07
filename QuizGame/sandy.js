//This function takes a string that has been deserialized by simpl into json.
function simplDeserialize(json_string)
{
	var total = 0;
	var name = "";
	var uncastObject = json_string;
	if(typeof json_string == "string")
		eval('('+json_string+')');
	
	for(var topLevel in uncastObject)
	{ 
		name = topLevel;
		total+=1;
	}
	if(total != 1)
	{
		alert("Error. There should only be 1"+"top level name in this object.");
	}
	
	if(typeof eval(name) != "function")
	{
		alert("Error. "+name+" is not in your object definitions object.");
	}
	var contructor = (eval(''+name+''));
	return new contructor(uncastObject[name]);
}

function no_underscore_replacer(key, value)
{
  if (key[0]=="_")
  {
      return undefined;
  }
  else return value;
}

//Works just like JSON.stringify but ignores any fields with an underscore prefix
function simplStringify(obj)
{
    return JSON.stringify(obj, no_underscore_replacer);
}

function simplSerialize(simpl_object)//we could add something for this...
{
    var return_object = new Object();
    return_object[""+(simpl_object._simpl_object_name)] = simpl_object;
	return simplStringify(return_object);
}

//Player
var player_json = '{"player":{"name":"Bob", "strength":"4", "speed":"3", "skin":"2"}}';
function player(json,name,strength,speed,skin)
{
   this._simpl_object_name = "player";
   this._simpl_non_scalar_types = {};
   if(json)
   {
     for(field in json)
     {
        this[field] = json[field];
     }
      return;
    }
    else
    {
       if(name) this.name = name;
       if(strength) this.strength = strength;
       if(speed) this.speed = speed;
       if(skin) this.skin = skin;
    }
}


//Human
var human_json = '{"human":{"name":"Sam", "strength":"33", "speed":"44", "skin":"2", "rank":"3", "level":"4", "cash":"4.6"}}';
function human(json,name,strength,speed,skin,rank,level,cash)
{
   this._simpl_object_name = "human";
   this._simpl_non_scalar_types = {};
   //tbd childFieldTypes map needed for construction non-scalars
   if(json)
   {
     for(field in json)
     {
        this[field] = json[field];
     }
      return;
    }
    else
    {
       if(name) this.name = name;
       if(strength) this.strength = strength;
       if(speed) this.speed = speed;
       if(skin) this.skin = skin;
       if(rank) this.rank = rank;
       if(level) this.level = level;
       if(cash) this.cash = cash;
    }
}
//Computer
var computer_json = '{"computer":{"name":"Jarvis", "strength":"30", "speed":"33", "skin":"6", "difficulty":"8.5", "type":"monster", "ai":"sneaky"}}';
function computer(json,name,strength,speed,skin,difficulty,type,ai)
{
   this._simpl_object_name = "computer";
   this._simpl_non_scalar_types = {};
   if(json)
   {
     for(field in json)
     {
        this[field] = json[field];
     }
      return;
    }
    else
    {
       if(name) this.name = name;
       if(strength) this.strength = strength;
       if(speed) this.speed = speed;
       if(skin) this.skin = skin;
       if(difficulty) this.difficulty = difficulty;
       if(type) this.type = type;
       if(ai) this.ai = ai;
    }
}
//Move
var move_json = '{"move":{"x":"4.0", "y":"4.0", "sneaking":"true", "move_time":"4.0"}}';
function move(json,x,y,sneaking,move_time)
{
   this._simpl_object_name = "move";
   this._simpl_non_scalar_types = {};
   if(json)
   {
     for(field in json)
     {
        this[field] = json[field];
     }
      return;
    }
    else
    {
       if(x) this.x = x;
       if(y) this.y = y;
       if(sneaking) this.sneaking = sneaking;
       if(move_time) this.move_time = move_time;
    }
}

//Movements
var movements_json = '{"movements":{"time":"5.0", "moves":{"moves":[{"sneaking":"true", "move_time":"4.0"},{"x":"4.0", "y":"3.0", "sneaking":"true", "move_time":"4.0"},{"x":"8.0", "y":"6.0", "sneaking":"true", "move_time":"4.0"},{"x":"12.0", "y":"9.0", "sneaking":"true", "move_time":"4.0"},{"x":"16.0", "y":"12.0", "sneaking":"true", "move_time":"4.0"},{"x":"20.0", "y":"15.0", "sneaking":"true", "move_time":"4.0"},{"x":"24.0", "y":"18.0", "sneaking":"true", "move_time":"4.0"},{"x":"28.0", "y":"21.0", "sneaking":"true", "move_time":"4.0"},{"x":"32.0", "y":"24.0", "sneaking":"true", "move_time":"4.0"},{"x":"36.0", "y":"27.0", "sneaking":"true", "move_time":"4.0"}]}}}';
function movements(json,time,moves)
{
   this._simpl_object_name = "movements";
   this._simpl_non_scalar_types = {"movements"};
   if(json)
   {
     for(field in json)
     {
        if(typeof this[field] != "object")
        {
            this[field] = json[field];
        }
        else
        {
            var collection = new Array();
            for(innerField in this[field])
            {
               var item = null;
               if(field in _simpl_non_scalar_types)
                   item = simplDeserialize(this[field]);
                else
                   item = this[field];
            	collection.push(item);
            }
        }
     }
      return;
    }
    else
    {
       if(time) this.time = time;
       if(moves) this.moves = moves;
    }
}
//Item
var item_json = '{"item":{"price":"25.0", "owner_name":"Rhema", "name":"pick"}}';
var bank_json = '{"bank":{"item_map":{"items":[{"price":"25.0", "owner_name":"Rhema", "name":"pick"},{"price":"25.0", "owner_name":"Rhema", "name":"gold-pick"},{"price":"25.0", "owner_name":"Rhema", "name":"iron-pick"},{"price":"25.0", "owner_name":"George", "name":"door"}]}}}';

//new player(eval(('('+player_json+')'))['player']);