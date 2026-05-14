import { Block, CodeGenerator } from "blockly";

export class SannyGenerator extends CodeGenerator {
  missionReward?: number;
  missionTitle?: string;

  constructor() {
    super("SannyBuilder");
  }

  // Allow any block to follow any other
  protected override scrub_(block: Block, code: string, opt_thisOnly?: boolean): string {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? "" : sannyGen.blockToCode(nextBlock);
    return code + nextCode;
  }
}

// Sanny Builder code generator for CLEO mission blocks
const sannyGen = new SannyGenerator();
sannyGen.INDENT = "  ";

const ORDER_NONE = 0;

// ─── MISSION ───────────────────────────────────────────────────────────────

sannyGen.forBlock["mission_given"] = function () {
  return "Stat.RegisterMissionGiven()\n\n";
};

sannyGen.forBlock["mission_pass"] = function (block) {
  return [
    "Audio.PlayMissionPassedTune(1)",
    `Stat.RegisterMissionPassed('${block.getFieldValue("KEXT") || "Mpass_0"}')`,
    "Player.AddScore($player, REWARD)",
    "Text.PrintWithNumberBig('M_PASS', REWARD, 5000, TextStyle.Middle)",
    "wait 5500",
    "",
  ].join("\n");
};

sannyGen.forBlock["mission_fail"] = function () {
  return [
    "Text.PrintBig('M_FAIL', 3500, TextStyle.Middle)",
    "wait 3000",
    "",
    "Mission.Fail()",
    "$onMission = false",
    "",
    "05DC: terminate_custom_thread",
  ].join("\n") + "\n";
};

sannyGen.forBlock["mission_finish"] = function () {
  return "\n" + [
    "Mission.Finish()",
    "$onMission = false",
    "$missionIndex += 1",
    "",
    "05DC: terminate_custom_thread",
  ].join("\n") + "\n";
};

// ─── FLOW ──────────────────────────────────────────────────────────────────

sannyGen.forBlock["wait"] = function (block) {
  const ms = block.getFieldValue("MS");
  return `wait ${ms}\n\n`;
};

sannyGen.forBlock["while_true"] = function (block, gen) {
  const body = gen.statementToCode(block, "BODY");
  return `while true\n${body}end\n\n`;
};

sannyGen.forBlock["while"] = function (block, gen) {
  const cond = gen.valueToCode(block, "COND", ORDER_NONE) || "true";
  const body = gen.statementToCode(block, "BODY");
  return `while ${cond}\nthen\n${body}end\n\n`;
};

sannyGen.forBlock["continue"] = function () {
  return `continue\n`;
};

sannyGen.forBlock["break"] = function () {
  return `break\n`;
};

sannyGen.forBlock["if"] = function (block, gen) {
  const cond = gen.valueToCode(block, "COND", ORDER_NONE) || "true";
  const body = gen.statementToCode(block, "BODY");
  return `if\n  ${cond}\nthen\n${body}end\n`;
};

sannyGen.forBlock["if_or"] = function (block, gen) {
  const c1 = gen.valueToCode(block, "COND1", ORDER_NONE) || "true";
  const c2 = gen.valueToCode(block, "COND2", ORDER_NONE) || "true";
  const body = gen.statementToCode(block, "BODY");
  return `if or\n  ${c1}\n  ${c2}\nthen\n${body}end\n`;
};

sannyGen.forBlock["if_and"] = function (block, gen) {
  const c1 = gen.valueToCode(block, "COND1", ORDER_NONE) || "true";
  const c2 = gen.valueToCode(block, "COND2", ORDER_NONE) || "true";
  const body = gen.statementToCode(block, "BODY");
  return `if and\n  ${c1}\n  ${c2}\nthen\n${body}end\n`;
};

sannyGen.forBlock["if_else"] = function (block, gen) {
  const cond = gen.valueToCode(block, "COND", ORDER_NONE) || "true";
  const thenBody = gen.statementToCode(block, "THEN");
  const elseBody = gen.statementToCode(block, "ELSE");
  return `if\n  ${cond}\nthen\n${thenBody}else\n${elseBody}end\n`;
};

sannyGen.forBlock["gosub"] = function (block) {
  const name = block.getFieldValue("NAME");
  return `${name}()\n`;
};

// ─── TEXT ──────────────────────────────────────────────────────────────────

sannyGen.forBlock["text_print_string"] = function (block) {
  const text = block.getFieldValue("TEXT").replace(/"/g, '\\"');
  const ms = block.getFieldValue("MS");
  return `Text.PrintString("${text}", {time} ${ms})\n`;
};

sannyGen.forBlock["text_print_string_and_wait"] = function (block) {
  const text = block.getFieldValue("TEXT").replace(/"/g, '\\"');
  const ms = block.getFieldValue("MS");
  return `Text.PrintString("${text}", {time} ${ms})\nwait ${Number(ms) + 250}\n`;
};

sannyGen.forBlock["text_clear"] = function () {
  return `Text.ClearPrints()\n`;
};

sannyGen.forBlock["text_print_title"] = function (block, gen) {
  if (!gen.missionTitle) throw new Error("Mission title is not defined");
  const title = gen.missionTitle.replace(/"/g, '\\"');
  const ms = block.getFieldValue("MS");
  return `Text.PrintBigString("${title}", {time} ${ms}, TextStyle.BottomRight)\n`;
};

sannyGen.forBlock["text_print_title_and_wait"] = function (block, gen) {
  if (!gen.missionTitle) throw new Error("Mission title is not defined");
  const title = gen.missionTitle.replace(/"/g, '\\"');
  const ms = block.getFieldValue("MS");
  return `Text.PrintBigString("${title}", {time} ${ms}, TextStyle.BottomRight)\nwait ${Number(ms) + 250}\n`;
};

sannyGen.forBlock["text_print_big_string"] = function (block) {
  const text = block.getFieldValue("TEXT").replace(/"/g, '\\"');
  const ms = block.getFieldValue("MS");
  return `Text.PrintBigString("${text}", {time} ${ms}, TextStyle.BottomRight)\n`;
};

sannyGen.forBlock["text_print_big_string_and_wait"] = function (block) {
  const text = block.getFieldValue("TEXT").replace(/"/g, '\\"');
  const ms = block.getFieldValue("MS");
  return `Text.PrintBigString("${text}", {time} ${ms}, TextStyle.BottomRight)\nwait ${Number(ms) + 250}\n`;
};

sannyGen.forBlock["text_print_help"] = function (block) {
  const text = block.getFieldValue("TEXT").replace(/"/g, '\\"');
  return `Text.PrintHelpString("${text}")\n`;
};

sannyGen.forBlock["text_clear_help"] = function () {
  return `Text.ClearHelp()\n`;
};

// ─── PLAYER CONDITIONS ─────────────────────────────────────────────────────

sannyGen.forBlock["player_can_start_mission"] = function () {
  return ["Player.CanStartMission($player)", ORDER_NONE];
};

sannyGen.forBlock["player_is_playing"] = function () {
  return ["Player.IsPlaying($player)", ORDER_NONE];
};

sannyGen.forBlock["player_is_health_greater"] = function (block) {
  const health = block.getFieldValue("HEALTH");
  return [`Player.IsHealthGreater($player, ${health})`, ORDER_NONE];
};

sannyGen.forBlock["player_is_dead"] = function () {
  return ["Player.IsDead($player)", ORDER_NONE];
};

sannyGen.forBlock["player_is_wanted_level_greater"] = function (block) {
  const level = block.getFieldValue("LEVEL");
  return [`Player.IsWantedLevelGreater($player, ${level})`, ORDER_NONE];
};

sannyGen.forBlock["player_has_been_arrested"] = function () {
  return ["Player.HasBeenArrested($player)", ORDER_NONE];
};

sannyGen.forBlock["player_has_weapon"] = function (block) {
  const weapon = block.getFieldValue("WEAPON");
  return [`Player.IsCurrentWeapon($player, ${weapon})`, ORDER_NONE];
};

sannyGen.forBlock["player_locate_2d"] = function (block) {
  const x = block.getFieldValue("X");
  const y = block.getFieldValue("Y");
  const r = block.getFieldValue("R");
  const marker = block.getFieldValue("MARKER") === "TRUE" ? "true" : "false";
  return [`Player.LocateAnyMeans2D($player, ${x}, ${y}, ${r}, ${r}, ${marker})`, ORDER_NONE];
};

sannyGen.forBlock["player_locate_3d"] = function (block) {
  const x = block.getFieldValue("X");
  const y = block.getFieldValue("Y");
  const z = block.getFieldValue("Z");
  const r = block.getFieldValue("R");
  const marker = block.getFieldValue("MARKER") === "TRUE" ? "true" : "false";
  return [`Player.LocateAnyMeans3D($player, ${x}, ${y}, ${z}, ${r}, ${r}, ${r}, ${marker})`, ORDER_NONE];
};

sannyGen.forBlock["player_in_any_car"] = function () {
  return ["Player.IsInAnyCar($player)", ORDER_NONE];
};

sannyGen.forBlock["player_sitting_in_car"] = function () {
  return ["Player.IsSittingInAnyCar($player)", ORDER_NONE];
};

sannyGen.forBlock["player_lifting_phone"] = function () {
  return ["Player.IsLiftingAPhone($player)", ORDER_NONE];
};

// ─── PICKUPS ───────────────────────────────────────────────────────────────

sannyGen.forBlock["pickup_create"] = function (block) {
  const v = block.getFieldValue("VAR");
  const model = block.getFieldValue("MODEL");
  const type = block.getFieldValue("TYPE");
  const x = block.getFieldValue("X");
  const y = block.getFieldValue("Y");
  const z = block.getFieldValue("Z");
  return `$${v} = Pickup.Create(${model}, PickupType.${type}, ${x}, ${y}, ${z})\n`;
};

sannyGen.forBlock["pickup_collected"] = function (block) {
  const v = block.getFieldValue("VAR");
  return [`Pickup.HasBeenCollected($${v})`, ORDER_NONE];
};

sannyGen.forBlock["pickup_remove"] = function (block) {
  const v = block.getFieldValue("VAR");
  return `Pickup.Remove($${v})\n`;
};

// ─── BLIPS ─────────────────────────────────────────────────────────────────

sannyGen.forBlock["blip_for_pickup"] = function (block) {
  const blip = block.getFieldValue("BLIP_VAR");
  const pickup = block.getFieldValue("PICKUP_VAR");
  return `$${blip} = Blip.AddForPickup($${pickup})\n`;
};

sannyGen.forBlock["blip_for_coord"] = function (block) {
  const blip = block.getFieldValue("BLIP_VAR");
  const x = block.getFieldValue("X");
  const y = block.getFieldValue("Y");
  const z = block.getFieldValue("Z");
  return `$${blip} = Blip.AddForCoord(${x}, ${y}, ${z})\n`;
};

sannyGen.forBlock["blip_remove"] = function (block) {
  const v = block.getFieldValue("VAR");
  return `Blip.Remove($${v})\n`;
};

// ─── AUDIO / CAMERA ────────────────────────────────────────────────────────

sannyGen.forBlock["audio_mission_passed"] = function () {
  return `Audio.PlayMissionPassedTune(1)\n`;
};

sannyGen.forBlock["camera_fade"] = function (block) {
  const dir = block.getFieldValue("DIR");
  const ms = block.getFieldValue("MS");
  return `Camera.DoFade(${ms}, Fade.${dir})\n`;
};

sannyGen.forBlock["camera_restore"] = function () {
  return `Camera.RestoreJumpcut()\n`;
};

sannyGen.forBlock["sound_one_off"] = function (block) {
  const sound = block.getFieldValue("SOUND");
  const x = block.getFieldValue("X");
  const y = block.getFieldValue("Y");
  const z = block.getFieldValue("Z");
  return `Sound.AddOneShot(${x}, ${y}, ${z}, ScriptSound.${sound})\n`;
};

sannyGen.forBlock["sound_loop"] = function (block) {
  const sound = block.getFieldValue("SOUND");
  const x = block.getFieldValue("X");
  const y = block.getFieldValue("Y");
  const z = block.getFieldValue("Z");
  return `Sound.AddContinuous(${x}, ${y}, ${z}, ScriptSound.${sound})\n`;
};

sannyGen.forBlock["sound_remove"] = function (block) {
  const v = block.getFieldValue("VAR");
  return `Sound.Remove($${v})\n`;
};

// ─── VARIABLES ─────────────────────────────────────────────────────────────

sannyGen.forBlock["var_set_bool_literal"] = function (block) {
  const v = block.getFieldValue("VAR");
  const val = block.getFieldValue("VAL");
  return `$${v} = ${val}\n`;
};

sannyGen.forBlock["var_set_bool"] = function (block, gen) {
  const v = block.getFieldValue("VAR");
  const cond = gen.valueToCode(block, "COND", ORDER_NONE) || "true";
  return `$${v} = ${cond}\n`;
};

sannyGen.forBlock["var_set_number"] = function (block) {
  const v = block.getFieldValue("VAR");
  const val = block.getFieldValue("VAL");
  return `$${v} = ${val}\n`;
};

sannyGen.forBlock["var_set_string"] = function (block) {
  const v = block.getFieldValue("VAR");
  const val = block.getFieldValue("VAL");
  return `$${v} = "${val}"\n`;
};

sannyGen.forBlock["var_check_bool"] = function (block) {
  const v = block.getFieldValue("VAR");
  const val = block.getFieldValue("VAL");
  return [`$${v} == ${val}`, ORDER_NONE];
};

sannyGen.forBlock["var_check_number"] = function (block) {
  const v = block.getFieldValue("VAR");
  const val = block.getFieldValue("VAL");
  return [`$${v} == ${val}`, ORDER_NONE];
};

export default sannyGen;
