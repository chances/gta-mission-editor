import Blockly from "blockly";

import sounds from "./enums/sounds.js";
import weapons from "./enums/weapons.js";

// Block definitions for CLEO/Sanny Builder mission scripting
const CLEOBlocks = {};

// ─── MISSION ───────────────────────────────────────────────────────────────

CLEOBlocks["mission_given"] = {
  init() {
    this.appendDummyInput()
      .appendField("mission given");
    this.setNextStatement(true, null);
    this.setColour(270);
    this.setTooltip("Register mission given, incrementing the player's attempt counter");
  },
};

CLEOBlocks["mission_pass"] = {
  init() {
    this.appendDummyInput()
      .appendField("mission")
      .appendField(new Blockly.FieldTextInput("NooM_X"), "KEXT")
      .appendField("passed");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(270);
    this.setTooltip("Play mission-passed tune, register pass, award score, show success banner");
  },
};

CLEOBlocks["mission_fail"] = {
  init() {
    this.appendDummyInput().appendField("fail mission & terminate");
    this.setPreviousStatement(true, null);
    this.setColour(270);
    this.setTooltip("Show fail banner, call Mission.Fail(), reset state, and terminate CLEO thread");
  },
};

CLEOBlocks["mission_finish"] = {
  init() {
    this.appendDummyInput().appendField("finish mission & terminate");
    this.setPreviousStatement(true, null);
    this.setColour(270);
    this.setTooltip("Mission.Finish(), reset state, and terminate CLEO thread");
  },
};

// ─── FLOW ──────────────────────────────────────────────────────────────────

CLEOBlocks["cleo_wait"] = {
  init() {
    this.appendDummyInput()
      .appendField("wait")
      .appendField(new Blockly.FieldNumber(0, 0), "MS")
      .appendField("ms");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
  },
};

CLEOBlocks["cleo_while_true"] = {
  init() {
    this.appendDummyInput().appendField("while true");
    this.appendStatementInput("BODY").setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
  },
};

CLEOBlocks["cleo_while"] = {
  init() {
    this.appendDummyInput().appendField("while");
    this.appendValueInput("COND").setCheck(null);
    this.appendStatementInput("BODY").setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
  },
};

CLEOBlocks["cleo_continue"] = {
  init() {
    this.appendDummyInput().appendField("continue");
    this.setPreviousStatement(true, null);
    this.setColour(210);
    this.setTooltip("Continue to the next iteration of the current loop");
  },
};

CLEOBlocks["cleo_break"] = {
  init() {
    this.appendDummyInput().appendField("break");
    this.setPreviousStatement(true, null);
    this.setColour(210);
    this.setTooltip("Exit the current loop");
  },
};

CLEOBlocks["cleo_if"] = {
  init() {
    this.appendValueInput("COND")
      .setCheck("Condition")
      .appendField("if");
    this.appendStatementInput("BODY").setCheck(null).appendField("then");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
  },
};

CLEOBlocks["cleo_if_or"] = {
  init() {
    this.appendValueInput("COND1").setCheck("Condition").appendField("if (any)");
    this.appendValueInput("COND2").setCheck("Condition").appendField("or");
    this.appendStatementInput("BODY").setCheck(null).appendField("then");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
  },
};

CLEOBlocks["cleo_if_and"] = {
  init() {
    this.appendValueInput("COND1").setCheck("Condition").appendField("if (all)");
    this.appendValueInput("COND2").setCheck("Condition").appendField("and");
    this.appendStatementInput("BODY").setCheck(null).appendField("then");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
  },
};

CLEOBlocks["cleo_if_else"] = {
  init() {
    this.appendValueInput("COND").setCheck("Condition").appendField("if");
    this.appendStatementInput("THEN").setCheck(null).appendField("then");
    this.appendStatementInput("ELSE").setCheck(null).appendField("else");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
  },
};

CLEOBlocks["cleo_gosub"] = {
  init() {
    this.appendDummyInput()
      .appendField("call function")
      .appendField(new Blockly.FieldTextInput("myFunction"), "NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
  },
};

// ─── TEXT ──────────────────────────────────────────────────────────────────

CLEOBlocks["text_print_string"] = {
  init() {
    this.appendDummyInput()
      .appendField("say")
      .appendField(new Blockly.FieldTextInput("Hello."), "TEXT")
      .appendField("for")
      .appendField(new Blockly.FieldNumber(3000, 0), "MS")
      .appendField("ms");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("Text.PrintString (Subtitle text)");
  },
};

CLEOBlocks["text_print_string_and_wait"] = {
  init() {
    this.appendDummyInput()
      .appendField("say")
      .appendField(new Blockly.FieldTextInput("Hello."), "TEXT")
      .appendField("for")
      .appendField(new Blockly.FieldNumber(3000, 0), "MS")
      .appendField("ms and wait");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("Text.PrintString (Subtitle text), then wait 250ms longer than the specified time");
  },
};

CLEOBlocks["text_clear"] = {
  init() {
    this.appendDummyInput()
      .appendField("clear prints");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("Text.ClearPrints");
  },
};

CLEOBlocks["text_print_big_string"] = {
  init() {
    this.appendDummyInput()
      .appendField("print title")
      .appendField(new Blockly.FieldTextInput("Mission Name"), "TEXT")
      .appendField("for")
      .appendField(new Blockly.FieldNumber(5000, 0), "MS")
      .appendField("ms");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("Text.PrintBigString (Bottom-right mission title)");
  },
};

CLEOBlocks["text_clear_small"] = {
  init() {
    this.appendDummyInput()
      .appendField("clear small prints");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("Text.ClearSmallPrints");
  },
};

CLEOBlocks["text_print_help"] = {
  init() {
    this.appendDummyInput()
      .appendField("print help")
      .appendField(new Blockly.FieldTextInput("Follow the map."), "TEXT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("Text.PrintHelpString (Top-left help message)");
  },
};

CLEOBlocks["text_clear_help"] = {
  init() {
    this.appendDummyInput()
      .appendField("clear help");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("Text.ClearHelp (Top-left help message)");
  },
};

// ─── PLAYER CONDITIONS ─────────────────────────────────────────────────────

CLEOBlocks["player_can_start_mission"] = {
  init() {
    this.appendDummyInput().appendField("player can start mission");
    this.setOutput(true, "Condition");
    this.setColour(0);
  },
};

CLEOBlocks["player_is_playing"] = {
  init() {
    this.appendDummyInput().appendField("player is playing");
    this.setOutput(true, "Condition");
    this.setColour(0);
  },
};

CLEOBlocks["player_is_health_greater"] = {
  init() {
    this.appendDummyInput().appendField("player ❤️ health greater than")
      .appendField(new Blockly.FieldNumber(0, 0, 200), "HEALTH");
    this.setOutput(true, "Condition");
    this.setColour(0);
  },
};

CLEOBlocks["player_is_dead"] = {
  init() {
    this.appendDummyInput().appendField("player is dead ☠️ (wasted)");
    this.setOutput(true, "Condition");
    this.setColour(0);
  },
};

CLEOBlocks["player_is_wanted_level_greater"] = {
  init() {
    this.appendDummyInput().appendField("player ⭐️ wanted level greater than")
      .appendField(new Blockly.FieldNumber(0, 0, 5), "LEVEL");
    this.setOutput(true, "Condition");
    this.setColour(0);
  },
};

CLEOBlocks["player_has_been_arrested"] = {
  init() {
    this.appendDummyInput().appendField("player has been arrested 👮 (busted)");
    this.setOutput(true, "Condition");
    this.setColour(0);
  },
};

const weaponOptions = Object.keys(weapons).reduce((acc, key) => {
  acc.push([key, weapons[key]]);
  return acc;
}, []);

CLEOBlocks["player_has_weapon"] = {
  init() {
    this.appendDummyInput().appendField("player has weapon")
      .appendField(new Blockly.FieldDropdown(weaponOptions), "WEAPON");
    this.setOutput(true, "Condition");
    this.setColour(0);
    this.setTooltip("Player.IsCurrentWeapon (True when player is holding the specified weapon)");
  },
};

CLEOBlocks["player_locate_2d"] = {
  init() {
    this.appendDummyInput()
      .appendField("player near 2D")
      .appendField("X").appendField(new Blockly.FieldNumber(0), "X")
      .appendField("Y").appendField(new Blockly.FieldNumber(0), "Y");
    this.appendDummyInput()
      .appendField("radius")
      .appendField(new Blockly.FieldNumber(3, 0.01), "R")
      .appendField("with sphere")
      .appendField(new Blockly.FieldCheckbox("TRUE"), "MARKER");
    this.setOutput(true, "Condition");
    this.setColour(0);
    this.setTooltip("Player.LocateAnyMeans2D (True when player is within radius of coords)");
  },
};

CLEOBlocks["player_locate_3d"] = {
  init() {
    this.appendDummyInput()
      .appendField("player near 3D")
      .appendField("X").appendField(new Blockly.FieldNumber(0), "X")
      .appendField("Y").appendField(new Blockly.FieldNumber(0), "Y")
      .appendField("Z").appendField(new Blockly.FieldNumber(0), "Z");
    this.appendDummyInput()
      .appendField("radius")
      .appendField(new Blockly.FieldNumber(2.5, 0.1), "R")
      .appendField("with sphere")
      .appendField(new Blockly.FieldCheckbox("TRUE"), "MARKER");
    this.setOutput(true, "Condition");
    this.setColour(0);
  },
};

CLEOBlocks["player_in_any_car"] = {
  init() {
    this.appendDummyInput().appendField("player is in a 🚘 car");
    this.setOutput(true, "Condition");
    this.setColour(0);
  },
};

CLEOBlocks["player_sitting_in_car"] = {
  init() {
    this.appendDummyInput().appendField("player is sitting in a 🚘 car");
    this.setOutput(true, "Condition");
    this.setColour(0);
  },
};

CLEOBlocks["player_lifting_phone"] = {
  init() {
    this.appendDummyInput().appendField("player is answering 📞 phone");
    this.setOutput(true, "Condition");
    this.setColour(0);
  },
};

// ─── PICKUPS ───────────────────────────────────────────────────────────────

CLEOBlocks["pickup_create"] = {
  init() {
    this.appendDummyInput()
      .appendField("create pickup  $")
      .appendField(new Blockly.FieldTextInput("package"), "VAR")
      .appendField("model")
      .appendField(new Blockly.FieldNumber(1321, 0), "MODEL");
    this.appendDummyInput()
      .appendField("type")
      .appendField(
        new Blockly.FieldDropdown([
          ["OnStreet", "OnStreet"],
          ["OnStreetSlow", "OnStreetSlow"],
          ["Once", "Once"],
        ]),
        "TYPE",
      )
      .appendField("X").appendField(new Blockly.FieldNumber(0), "X")
      .appendField("Y").appendField(new Blockly.FieldNumber(0), "Y")
      .appendField("Z").appendField(new Blockly.FieldNumber(0), "Z");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(30);
  },
};

CLEOBlocks["pickup_collected"] = {
  init() {
    this.appendDummyInput()
      .appendField("pickup  $")
      .appendField(new Blockly.FieldTextInput("package"), "VAR")
      .appendField("was collected");
    this.setOutput(true, "Condition");
    this.setColour(30);
  },
};

CLEOBlocks["pickup_remove"] = {
  init() {
    this.appendDummyInput()
      .appendField("remove pickup  $")
      .appendField(new Blockly.FieldTextInput("package"), "VAR");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(30);
  },
};

// ─── BLIPS ─────────────────────────────────────────────────────────────────

CLEOBlocks["blip_for_pickup"] = {
  init() {
    this.appendDummyInput()
      .appendField("blip  $")
      .appendField(new Blockly.FieldTextInput("blip"), "BLIP_VAR")
      .appendField("on pickup  $")
      .appendField(new Blockly.FieldTextInput("package"), "PICKUP_VAR");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(30);
  },
};

CLEOBlocks["blip_for_coord"] = {
  init() {
    this.appendDummyInput()
      .appendField("blip  $")
      .appendField(new Blockly.FieldTextInput("blip"), "BLIP_VAR")
      .appendField("at")
      .appendField("X").appendField(new Blockly.FieldNumber(0), "X")
      .appendField("Y").appendField(new Blockly.FieldNumber(0), "Y")
      .appendField("Z").appendField(new Blockly.FieldNumber(0), "Z");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(30);
  },
};

CLEOBlocks["blip_remove"] = {
  init() {
    this.appendDummyInput()
      .appendField("remove blip  $")
      .appendField(new Blockly.FieldTextInput("blip"), "VAR");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(30);
  },
};

// ─── CAMERA ────────────────────────────────────────────────────────────────

CLEOBlocks["camera_fade"] = {
  init() {
    this.appendDummyInput()
      .appendField("camera fade")
      .appendField(new Blockly.FieldDropdown([["out", "Out"], ["in", "In"]]), "DIR")
      .appendField("for")
      .appendField(new Blockly.FieldNumber(750, 0), "MS")
      .appendField("ms");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(75);
  },
};

CLEOBlocks["camera_restore"] = {
  init() {
    this.appendDummyInput().appendField("restore camera (jumpcut)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(75);
  },
};

// ─── AUDIO ─────────────────────────────────────────────────────────────────

CLEOBlocks["audio_mission_passed"] = {
  init() {
    this.appendDummyInput().appendField("play mission passed tune");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
  },
};

const soundOptions = Object.keys(sounds).reduce((acc, key) => {
  acc.push([key, sounds[key]]);
  return acc;
}, []);

CLEOBlocks["sound_one_off"] = {
  init() {
    this.appendDummyInput()
      .appendField("play one off sound  $")
      .appendField(new Blockly.FieldDropdown(soundOptions), "SOUND")
      .appendField("at")
      .appendField("X").appendField(new Blockly.FieldNumber(0), "X")
      .appendField("Y").appendField(new Blockly.FieldNumber(0), "Y")
      .appendField("Z").appendField(new Blockly.FieldNumber(0), "Z");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
  },
};

CLEOBlocks["sound_loop"] = {
  init() {
    this.appendDummyInput()
      .appendField("play looping sound  $")
      .appendField(new Blockly.FieldDropdown(soundOptions), "SOUND")
      .appendField("at")
      .appendField("X").appendField(new Blockly.FieldNumber(0), "X")
      .appendField("Y").appendField(new Blockly.FieldNumber(0), "Y")
      .appendField("Z").appendField(new Blockly.FieldNumber(0), "Z");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
  },
};

CLEOBlocks["sound_remove"] = {
  init() {
    this.appendDummyInput()
      .appendField("stop sound  $")
      // TODO: Use a dropdown for sound names
      .appendField(new Blockly.FieldTextInput("SoundPayphoneRinging"), "VAR");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
  },
};

// ─── VARIABLES ─────────────────────────────────────────────────────────────

CLEOBlocks["var_set_bool_literal"] = {
  init() {
    this.appendDummyInput()
      .appendField("set bool $")
      .appendField(new Blockly.FieldTextInput("myVar"), "VAR")
      .appendField("to")
      .appendField(new Blockly.FieldDropdown([["true", "true"], ["false", "false"]]), "VAL");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
  },
};

CLEOBlocks["var_set_bool"] = {
  init() {
    this.appendDummyInput()
      .appendField("set bool $")
      .appendField(new Blockly.FieldTextInput("myVar"), "VAR");
    this.appendValueInput("COND").setCheck("Condition").appendField("to");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
  },
};

CLEOBlocks["var_set_number"] = {
  init() {
    this.appendDummyInput()
      .appendField("set number $")
      .appendField(new Blockly.FieldTextInput("myVar"), "VAR")
      .appendField("to")
      .appendField(new Blockly.FieldNumber(0, "VAL"));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
  },
};

CLEOBlocks["var_set_string"] = {
  init() {
    this.appendDummyInput()
      .appendField("set string $")
      .appendField(new Blockly.FieldTextInput("myVar"), "VAR")
      .appendField("to")
      .appendField(new Blockly.FieldTextInput("Hello"), "VAL");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
  },
};

CLEOBlocks["var_check_bool"] = {
  init() {
    this.appendDummyInput()
      .appendField("$")
      .appendField(new Blockly.FieldTextInput("myVar"), "VAR")
      .appendField("equals")
      .appendField(new Blockly.FieldDropdown([["true", "true"], ["false", "false"]]), "VAL");
    this.setOutput(true, "Condition");
    this.setColour(330);
  },
};

CLEOBlocks["var_check_number"] = {
  init() {
    this.appendDummyInput()
      .appendField("$")
      .appendField(new Blockly.FieldTextInput("myVar"), "VAR")
      .appendField("equals")
      .appendField(new Blockly.FieldNumber(0, "VAL"));
    this.setOutput(true, "Condition");
    this.setColour(330);
  },
};

export default CLEOBlocks;
