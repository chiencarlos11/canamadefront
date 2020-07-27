var math = require('mathjs');
var Fraction = require('fraction.js');


//GLOBAL
var parse_fraction = function(string_fraction){

	let result = 0;

	if (string_fraction && string_fraction !== '0'){
		var split = string_fraction.split('/');
		result = parseInt(split[0], 10) / parseInt(split[1], 10);
	}

	return result;

}

export const CONTROL_SIZE = ['24','36','48','60','72','84','96'];
export const FRACTIONS = ['0','1/8','1/4','3/8','1/2','5/8','3/4','7/8'];


//LAURENT
export const LAURENT_ITEMS = ['date', 'po_number', 'original_width', 'original_width_fraction', 'original_height', 'original_height_fraction',
'control_size', 'cassette_orientation', 'cassette_extra', 
'cassette_color', 'fabric_type', 'fabric_color', 'cassette_size', 'tube_tob', 'inner', 'outer','height'];

export const LAURENT_ITEMS_FABRIC = {"Laurent": ["301","302","305","306"],
"Morgan":["801","802","803","805"],
"Husky": ["701","702","703","704","711","712","713","714"],
"Scotby": ["401","402","404","407"],
"Galaxy": ["601","603","605"],
"Richmond": ["B301","B303","B306","B307"],
"Timber": ["501","502","504","507"],
"Bella": ["201","202","203","204","205"],
"Bond": ["311","312","313","314"],
"Grand": ["B901","B902","B903","B904"]
};

export var handleLaurentDataPiece = function(name, value, state){

	if (value && name === 'original_width'){
		let new_cassette_size = math.fraction(parseFloat(value) - (3/8));
		let new_tube_tob = math.fraction(new_cassette_size - 1);
		let new_inner = math.fraction(new_tube_tob - (1/4));
		let new_outer = math.fraction(new_tube_tob + (1/8));
		return {"cassette_size":new_cassette_size,"tube_tob": new_tube_tob,"inner":new_inner,"outer": new_outer}
	} else if(value && name === 'original_width_fraction'){
		let original_width = math.fraction(state.original_width)
		let original_width_fraction_fraction = math.fraction(parse_fraction(value))
		let new_cassette_size = (parseFloat(original_width) + original_width_fraction_fraction) - (3/8);
		let new_tube_tob = new_cassette_size - 1;
		let new_inner = math.fraction(new_tube_tob - (1/4));
		let new_outer = math.fraction(new_tube_tob + (1/8));
		return {"cassette_size":new_cassette_size,"tube_tob": new_tube_tob,"inner":new_inner,"outer": new_outer}
	}

}

export var handleLaurentheight = function(original_height, original_height_fraction,fabric_type){

	let new_height = 0;
    if (fabric_type === 'Laurent' || fabric_type === 'Husky' || fabric_type === 'Galaxy' || fabric_type === 'Bella'){
      new_height = math.number(original_height) + math.number(parse_fraction(original_height_fraction)) + (3 + (7/8)); 
    }
    if (fabric_type === 'Timber' || fabric_type === 'Scotby' || fabric_type === 'Morgan'){
      new_height = math.number(original_height) + math.number(parse_fraction(original_height_fraction)) + ( 4 + (1/8));
    }
    if (fabric_type === 'Richmond'){
      new_height = math.number(original_height) + math.number(parse_fraction(original_height_fraction)) + ( 4 + (1/2));
    }
    if (fabric_type === 'Bond'){
      new_height = math.number(original_height) + math.number(parse_fraction(original_height_fraction)) + ( 3 + (7/8));
    }
    if (fabric_type === 'Grand'){
      new_height = math.number(original_height) + math.number(parse_fraction(original_height_fraction)) + ( 5 + (1/4));
    }

    return new_height;

}

//ROLLER SHADE
export const ROLLER_SHADE_ITEMS = ['date', 'po_number', 'original_width', 'original_width_fraction', 'original_height', 'original_height_fraction',
'control_size', 'cassette_orientation', 'cassette_extra', 
'cassette_color', 'fabric_type', 'fabric_color', 'cassette_size', 'tube_tob','height'];


export const ROLLER_SHADE_ITEMS_FABRIC = {"Maze Screen 5%": ["101","103","107","131"],
"Levendale BO":["B902","B903","B904","B905","B906"],
"Magna BO": ["B702","B704","B708","B710","B711"],
"Milan 4%": ["402","403","405"],
"Paris 3%": ["102","101","104","121","213"],
"Mesh Screen 1%": ["101","105","282"],
"Cana Screen 1%": ["101","102","103","104","106","107"],
"Cana Screen 3%": ["101","102","103","104","106","107"],
"Regent 4%": ["201","202","203"],
"Cana Vision 3%": ["101","102","103","105","107"],
"Cana Vision 5%": ["101","102","103","105","107"],
"Magna": ["702","704","708","710","711"],
"Melrose": ["101","102","104","112"],
"Melrose B/O": ["101","102","104","112"],
"Lytton": ["901","902","903","904"],
"Somerset": ["101","102","105"],
"Urban": ["1101","1103","1107"],
"Urban B/O": ["1901","1903","1907"],
"Aliex": ["1901","1903","1905"],
"Shawna": ["1111","1112","1114","1911","1912","1914"],};	


//CANAMADE
export const CANAMADE_ITEMS = ['date', 'po_number', 'original_width', 'original_width_fraction', 'original_height', 'original_height_fraction',
'control_size', 'cassette_orientation', 'cassette_extra', 
'cassette_color', 'fabric_type', 'fabric_color', 'cassette_size', 'tube_tob','height'];



export const CANAMADE_ITEMS_FABRIC = {"Light Filtering": ["0101","0501","0202","1802","2501","3001"],
"Room Darkening":["B0101","B0501","B0202","B1802","B2501","B3001"]};


export var handleCanaMadeDataPiece = function(name, value, state){

	if (value && name === 'original_width'){
		let original_width_fraction_fraction = math.fraction(state.original_width_fraction)
		let new_cassette_size = (parseFloat(value) + original_width_fraction_fraction) - (3/8);
		let new_tube_tob = new_cassette_size - 1;
		return {"cassette_size":new_cassette_size,"tube_tob": new_tube_tob}
	} else if(value && name === 'original_width_fraction'){
		console.log("Setting original_width_fraction = " + value)
		let original_width = math.fraction(state.original_width)
		let original_width_fraction_fraction = math.fraction(parse_fraction(value))
		let new_cassette_size = (parseFloat(original_width) + original_width_fraction_fraction) - (3/8);
		let new_tube_tob = new_cassette_size - 1;
		return {"cassette_size":new_cassette_size,"tube_tob": new_tube_tob}
	}

}

export var handleCanaMadeheight = function(original_height,original_height_fraction,fabric_type){

    let new_height = 0;
    new_height = math.number(original_height) + math.number(parse_fraction(original_height_fraction)) + 10;
    return new_height;

}



export var compute_fraction = function(value){

	if (value === undefined){
		return 0
	}

    let frac = value%1;
    var x = new Fraction(frac);
    var res = x.toFraction(true);
    if ('' + res === '0'){
      return Math.trunc(value)
    }
    else{
      return Math.trunc(value) + " " + res
    }

  }