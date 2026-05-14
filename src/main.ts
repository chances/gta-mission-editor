import Blockly from "blockly";

import blocks from "./blocks.ts";
import sannyGen from "./generator.ts";
import toolbox from "./toolbox.ts";

Blockly.common.defineBlocks(blocks);
Blockly.Scrollbar.scrollbarThickness = 10;

const workspace = Blockly.inject("blocklyDiv", {
  toolbox,
  theme: Blockly.Themes.Zelos,
  grid: { spacing: 24, length: 8, colour: "#2a2a4a", snap: true },
  zoom: { controls: true, wheel: true, startScale: 0.9 },
  trashcan: true,
  scrollbars: true,
});

// ─── Starter blocks ────────────────────────────────────────────────────────

const startXml = `
<xml>
  <block type="mission_given">
    <next>
      <block type="text_print_title">
        <field name="MS">5000</field>
        <next>
          <block type="wait"><field name="MS">7500</field>
            <next>
              <block type="while_true">
                <statement name="BODY">
                  <block type="wait"><field name="MS">0</field>
                    <next>
                      <block type="if_or">
                        <value name="COND1"><block type="player_is_dead"/></value>
                        <value name="COND2"><block type="player_has_been_arrested"/></value>
                        <statement name="BODY">
                          <block type="mission_fail"/>
                        </statement>
                        <next>
                          <block type="break" />
                        </next>
                      </block>
                    </next>
                  </block>
                </statement>
                <next>
                  <block type="audio_mission_passed">
                    <next>
                      <block type="mission_pass">
                        <next>
                          <block type="mission_finish"/>
                        </next>
                      </block>
                    </next>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>
`.trim();

Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(startXml), workspace);

// ─── Generate ──────────────────────────────────────────────────────────────

function generate() {
  const title = (document.getElementById("missionName") as HTMLInputElement)?.value ?? "My Mission";
  const description = (document.getElementById("missionDescription") as HTMLInputElement)?.value ?? "";
  const reward = Number((document.getElementById("missionReward") as HTMLInputElement)?.value) ?? 250;

  sannyGen.missionTitle = title;
  sannyGen.missionReward = reward;

  const header = [
    `{$CLEO .cm}`,
    ``,
    `//==============================================`,
    `// ${title}`,
    `// ${description}`,
    `//==============================================`,
    `const REWARD = ${reward}`,
    ``,
  ].join("\n") + "\n";
  const body = sannyGen.workspaceToCode(workspace);

  document.getElementById("codeOutput")!.textContent = header + body;
}

document.getElementById("generateBtn")!.addEventListener("click", generate);

document.getElementById("copyBtn")!.addEventListener("click", () => {
  const text = document.getElementById("codeOutput")!.textContent;
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById("copyBtn")!;
    btn.textContent = "Copied!";
    setTimeout(() => {
      btn.textContent = "Copy";
    }, 1500);
  });
});

// Auto-generate on workspace change (debounced)
let debounceTimer: number;
workspace.addChangeListener(() => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(generate, 400);
});

generate();
