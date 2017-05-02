DDH.conversions = DDH.conversions || {};

(function(DDH) {
    "use strict";

    var localDOMInitialized = false;
    var initialized = false;

    // UI: the input / output fields
    var $convert_left,
        $convert_right,
        $select_right,
        $select_left,
        $unitSelector,
        $selects;

    var Converter = {

        // the local vars
        leftUnit:   "",
        rightUnit:  "",
        leftValue:  "",
        rightValue: "",

        setValues: function() {
            this.setLeftUnit();
            this.setRightUnit();
            this.setLeftValue();
            this.setRightValue();
        },

        setLeftUnit: function() {
            this.leftUnit = $select_left.val();
        },

        setLeftValue: function() {
            this.leftValue = $convert_left.val();
        },

        setRightUnit: function() {
            this.rightUnit = $select_right.val();
        },

        setRightValue: function() {
            this.rightValue = $convert_right.val();
        },

        eval: function( expression ) {
            return math.eval(expression).format({ precision: 6 }).split(" ")[0];
        },

        convert: function( side ) {

            this.setValues();
            if(side === "right") {
                var expression = this.leftValue + " " + this.leftUnit + " to " + this.rightUnit;
                $convert_right.val(this.eval(expression));
            } else {
                var expression = this.rightValue + " " + this.rightUnit + " to " + this.leftUnit;
                $convert_left.val(this.eval(expression));
            }
        },

        emptySelects: function() {
            // removes all the options
            $select_left.empty();
            $select_right.empty();
        },

        updateUnitSelectors: function( key ) {

            // resets the selects state
            this.emptySelects();
            // sort the keys alphabetically
            Units[key].units.sort();

            // adds the new conversion units to the selects
            for(var i = 0 ; i < Units[key].units.length ; i++) {
                $selects.append(
                    '<option value="' + Units[key].units[i].symbol + '">'
                    + Units[key].units[i].name
                    + '</option>'
                );
            }

            // set defaults. these should match Units[key].units[i].symbol
            $select_left.val(Units[key].defaults[0]);
            $select_right.val(Units[key].defaults[1]);
        },

        updateBaseUnitSelector: function( startBase ) {
            // adds the different unit types to the selector
            var unitKeys = Object.keys(Units);
            $.each(unitKeys.sort(), function(_key, value) {
                $unitSelector.append(
                    '<option value="'+value+'"' + (value === startBase ? " selected='selected'" : "") + '>'
                    + Units[value].name
                    + '</option>'
                );
            });
        }
    } // Converter

    var Utils = {
        
        // custom unit support
        setUpCustomUnits: function() {
            
            // CUSTOM ENERGY UNITS
            math.createUnit('kilojoule', '1000 joules');
            math.createUnit('gramcalorie', '4.184 joules');
            math.createUnit('kilocalorie', '4184 joules');
            
            // CUSTOM DIGITAL UNITS
            math.createUnit('kb', '1000 b');
            math.createUnit('mb', '1000000 b');
            math.createUnit('gb', '1000000000 b');
            math.createUnit('Tb', '1000000000000 b');
            math.createUnit('KB', '1000 B');
            math.createUnit('MB', '1000000 B');
            math.createUnit('GB', '1000000000 B');
            math.createUnit('TB', '1000 GB');
            math.createUnit('PB', '1000 TB');
            
            
            // math.createUnit('')
            
        },

        // caches the local DOM vars
        setUpLocalDOM: function() {
            var $root           = DDH.getDOM('conversions');
            $convert_left       = $root.find(".frm__input--left");
            $convert_right      = $root.find(".frm__input--right");
            $selects            = $root.find(".frm--top select");
            $select_right       = $root.find(".frm__select--right");
            $select_left        = $root.find(".frm__select--left");
            $unitSelector       = $root.find(".frm__select--bottom");
            localDOMInitialized = true;
        },
    } // Utils

    var Units = {
        length: {
            name: "Length",
            units: [
                { symbol: 'decameter',  name: 'Decameter' },
                { symbol: 'millimeter', name: 'Millimeter' },
                { symbol: 'micrometer', name: 'Micrometer' },
                { symbol: 'micrometer', name: 'Micrometer' },
                { symbol: 'nanometer',  name: 'Nanometer' },
                { symbol: 'picometer',  name: 'Picometer' },
                { symbol: 'kilometer',  name: 'Kilometer' },
                { symbol: 'meter',      name: 'Meter' },
                { symbol: 'cm',         name: 'Centimeter' },
                { symbol: 'hectometer', name: 'Hectometer' },
                { symbol: 'chains',     name: 'Chains' },
                { symbol: 'inch',       name: 'Inch' },
                { symbol: 'foot',       name: 'Feet' },
                { symbol: 'yard',       name: 'Yard' },
                { symbol: 'mile',       name: 'Mile' },
                { symbol: 'link',       name: 'Link' },
                { symbol: 'rod',        name: 'Rod' },
                { symbol: 'angstrom',   name: 'Angstrom' },
                { symbol: 'mil',        name: 'Mil'}
            ],
            defaults: ['meter', 'cm']
        },
        area: {
            name: "Area",
            units: [
                { symbol: 'm2',         name: 'Square Meter' },
                { symbol: 'sqin',       name: 'Square Inch' },
                { symbol: 'sqft',       name: 'Square Feet' },
                { symbol: 'sqyd',       name: 'Square Yard' },
                { symbol: 'sqmi',       name: 'Square Mile' },
                { symbol: 'acre',       name: 'Acre' },
                { symbol: 'hectare',    name: 'Hectare' }
            ],
            defaults: ['m2', 'sqin']
        },
        volume: {
            name: "Volume",
            units: [
                { symbol: 'litre',      name: 'Litre' },
                { symbol: 'millilitre', name: 'Millilitre' },
                { symbol: 'hectolitre', name: 'Hectolitre' },
                { symbol: 'decalitre',  name: 'Decalitre' },
                { symbol: 'deciliter',  name: 'Deciliter' },
                { symbol: 'centilitre', name: 'Centilitre' },
                { symbol: 'cc',         name: 'CC' },
                { symbol: 'cuin',       name: 'Cuin' },
                { symbol: 'cuft',       name: 'Cuft' },
                { symbol: 'cups',       name: 'Cups' },
                { symbol: 'cuyd',       name: 'Cubic Yard' },
                { symbol: 'pints',      name: 'Pints' },
                { symbol: 'teaspoon',   name: 'Teaspoon' },
                { symbol: 'tablespoon', name: 'Tablespoon' },
            ],
            defaults: ['litre', 'millilitre']
        },
        liquid_volume: { // double check this works
            name: "Liquid Volume",
            units: [
                { symbol: 'minim',          name: 'Minim' }, // add in proper name
                { symbol: 'fluiddram',      name: 'Fluid Dram' },
                { symbol: 'fluidounce',     name: 'Fluid Ounce' },
                { symbol: 'gill',           name: 'Gill' },
                { symbol: 'cup',            name: 'Cup' },
                { symbol: 'pint',           name: 'Pint'},
                { symbol: 'quart',          name: 'Quart'},
                { symbol: 'gallon',         name: 'Gallon'},
                { symbol: 'beerbarrel',     name: 'Beerbarrel'}, 
                { symbol: 'oilbarrel',      name: 'oilbarrel'},
                { symbol: 'hogshead',       name: 'Hogshead'},
                { symbol: 'drop',           name: 'Drop'},
            ],
            defaults: ['minim', 'fluiddram']
        },
        angle: {
            name: "Angle",
            units: [
                { symbol: 'rad',        name: 'Radians' },
                { symbol: 'deg',        name: 'Degrees' },
                { symbol: 'grad',       name: 'Gradians' },
                { symbol: 'cycle',      name: 'Cycles' },
                { symbol: 'arcsec',     name: 'Arcsecs' }, // update to proper name
                { symbol: 'arcmin',     name: 'Arcmin' }, // update to proper name
                { symbol: 'millirad',   name: 'Milliradian' },
            ],
            defaults: ['deg', 'rad']
        },
        duration: {
            name: "Duration",
            units: [
                { symbol: 'nanosecond',     name: 'Nanoseconds' },
                { symbol: 'microsecond',    name: 'Microseconds' },
                { symbol: 'millisecond',    name: 'Milliseconds' },
                { symbol: 'second',         name: 'Seconds' },
                { symbol: 'minute',         name: 'Minutes' },
                { symbol: 'hour',           name: 'Hours' },
                { symbol: 'day',            name: 'Days' },
                { symbol: 'week',           name: 'Weeks' },
                { symbol: 'month',          name: 'Months'},
                { symbol: 'year',           name: 'Years' },
                { symbol: 'decade',         name: 'Decade' },
                { symbol: 'century',        name: 'Century' },
                { symbol: 'millennium',     name: 'Millennium' },
            ],
            defaults: ['minute', 'second']
        },
        mass: {
            name: "Mass",
            units: [
                { symbol: 'microgram',      name: 'Microgram' },
                { symbol: 'kilogram',       name: 'Kilogram' },
                { symbol: 'milligram',      name: 'Milligram' },
                { symbol: 'gram',           name: 'Gram' },
                { symbol: 'ton',            name: 'Ton' },
                { symbol: 'grain',          name: 'Grain' },
                { symbol: 'dram',           name: 'Dram' },
                { symbol: 'ounce',          name: 'Ounce' },
                { symbol: 'poundmass',      name: 'Pound' },
                { symbol: 'hundredweight',  name: 'Hundredweight' },
                { symbol: 'stick',          name: 'Stick' },
                { symbol: 'stone',          name: 'Stone' },
            ],
            defaults: ['kilogram', 'gram']
        },
        temperature: {
            name: "Temperature",
            units: [
                { symbol: 'kelvin',     name: 'Kelvin' },
                { symbol: 'celsius',    name: 'Celsius' },
                { symbol: 'fahrenheit', name: 'Fahrenheit' },
                { symbol: 'rankine',    name: 'Rankine' },
            ],
            defaults: ['celsius', 'fahrenheit']
        },
        force: {
            name: "Force",
            units: [
                { symbol: 'newton',     name: 'Newton' },
                { symbol: 'dyne',       name: 'Dyne'},
                { symbol: 'poundforce', name: 'Pound Force'},
                { symbol: 'kip',        name: 'Kip'},
            ],
            defaults: ['newton', 'dyne']
        },
        energy: {
            name: "Energy",
            units: [
                { symbol: 'joule',          name: 'Joule' },
                { symbol: 'kilojoule',      name: 'kilojoule' },
                { symbol: 'gramcalorie',    name: 'Gram Calorie'},
                { symbol: 'kilocalorie',    name: 'Kilo Calorie'},
                // 'killowatt/hr', ~~ add in support for this
                { symbol: 'Wh',             name: 'Wh' }, // add in the proper name for this
                { symbol: 'erg',            name: 'erg' },
                { symbol: 'BTU',            name: 'British Thermal Unit'},
                { symbol: 'electronvolt',   name: 'Electronvolt'},
            ],
            defaults: ['joule', 'Wh']
        },
        power: {
            name: "Power",
            units: [
                { symbol: 'watt', name: 'Watt'},
                { symbol: 'hp', name: 'HP' }
            ],
            defaults: ['watt', 'hp']
        },
        pressure: {
            name: "Pressure",
            units: [
                { symbol: 'Pa',     name: 'Pascal' },
                { symbol: 'psi',    name: 'Pounds per Square Inch' },
                { symbol: 'atm',    name: 'atm' }, // add in propert name
                { symbol: 'torr',   name: 'Torr' },
                { symbol: 'mmHg',   name: 'mmHg' }, // add in proper name
                { symbol: 'mmH2O',  name: 'mmH2O' }, // add in proper name
                { symbol: 'cmH20',  name: 'cmH20' }, // add in proper name
                { symbol: 'bar',    name: 'Bars' },
            ],
            defaults: ['Pa', 'psi']
        },
        digital: {
            name: "Digital Storage",
            units: [
                { symbol: 'b', name: 'Bit' },
                { symbol: 'B', name: 'Byte' },
                { symbol: 'kb', name: 'Kilobit' },
                { symbol: 'mb', name: 'Megabit'},
                { symbol: 'gb', name: 'Gigabit'},
                { symbol: 'Tb', name: 'Terrabit'},
                { symbol: 'KB', name: 'Kilobyte'},
                { symbol: 'MB', name: 'Megabyte'},
                { symbol: 'GB', name: 'Gigabyte'},
                { symbol: 'TB', name: 'Terabyte'},
                { symbol: 'PB', name: 'Petabyte'},
            ],
            defaults: ['b', 'B']
        },
    } // Units

    DDH.conversions.build = function(ops) {

        // just defaulting to `length` for now, will change when interacting with perl backend.
        var startBase = ops.data.physical_quantity || 'length';
        var leftUnit = ops.data.left_unit || Units[startBase].defaults[0];
        var rightUnit = ops.data.right_unit || Units[startBase].defaults[1];
        var rawInput = ops.data.raw_input || '1';
        var unitsSpecified = false;

        return {
            signal: "high",
            onShow: function() {
                DDG.require('math.js', function() {    

                    if(!localDOMInitialized) {
                        Utils.setUpLocalDOM();
                        Utils.setUpCustomUnits();
                    }

                    if(!initialized) {
                        Converter.updateUnitSelectors(startBase);
                        Converter.updateBaseUnitSelector(startBase);

                        // if no numbers provided, fall back on 1
                        if(!unitsSpecified) {
                            $convert_left.val(rawInput);
                            $select_left.val(leftUnit);
                            $select_right.val(rightUnit);
                            Converter.convert("right");
                        }

                        initialized = true;
                    }

                    $convert_left.keyup(function( _e ) {
                        if(this.value === "") {
                            $convert_right.val("");
                        }
                        if(this.value !== "" && $.isNumeric(this.value)) {
                            Converter.convert("right");
                        }
                    });

                    $convert_right.keyup(function( _e ) {
                        if(this.value === "") {
                            $convert_left.val("");
                        }
                        if(this.value !== "" && $.isNumeric(this.value)) {
                            Converter.convert("left");
                        }
                    });
                    
                    $convert_left.click(function() {
                        this.select() 
                    });
                    
                    $convert_right.click(function() {
                        this.select() 
                    });

                    $select_right.change(function() {
                        Converter.convert("right");
                    });

                    $select_left.change(function() {
                        Converter.convert("left");
                    });

                    // if the user changes the unit base
                    $unitSelector.change(function() {
                        Converter.updateUnitSelectors(this.value);
                        $convert_left.val("1");
                        Converter.convert("right");
                    });
                    

                });

            }// on show
        }; // return
    }; // DDH.conversions.build

    // checks we are not in the browser and exposes Converter for testing
    if (typeof window === 'undefined') {
        module.exports = { Converter: Converter };
    }

})(DDH);
