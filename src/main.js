import Blockly from "blockly";

import blocks from "./blocks.js";
import sannyGen from "./generator.js";
import toolbox from "./toolbox.js";

Blockly.common.defineBlocks(blocks);

const workspace = Blockly.inject("blocklyDiv", {
  toolbox,
  theme: Blockly.Themes.Dark,
  grid: { spacing: 24, length: 8, colour: "#2a2a4a", snap: true },
  zoom: { controls: true, wheel: true, startScale: 0.9 },
  trashcan: true,
  scrollbars: true,
});

// ─── Starter blocks ────────────────────────────────────────────────────────

const startXml = `
<xml>
  <block type="text_print_big_string">
    <field name="TEXT">My Mission</field>
    <field name="MS">5000</field>
    <next>
      <block type="cleo_wait"><field name="MS">7500</field>
        <next>
          <block type="cleo_while_true">
            <statement name="BODY">
              <block type="cleo_wait"><field name="MS">0</field>
                <next>
                  <block type="cleo_if_or">
                    <value name="COND1"><block type="player_is_dead"/></value>
                    <value name="COND2"><block type="player_has_been_arrested"/></value>
                    <statement name="BODY">
                      <block type="mission_fail"/>
                    </statement>
                  </block>
                </next>
              </block>
            </statement>
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
  const title = document.getElementById("missionName").value || "My Mission";
  const description = document.getElementById("missionDescription").value || "";
  const reward = document.getElementById("missionReward").value || 250;

  sannyGen._missionTitle = title;
  sannyGen._missionReward = reward;

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

  document.getElementById("codeOutput").textContent = header + body;
}

document.getElementById("generateBtn").addEventListener("click", generate);

document.getElementById("copyBtn").addEventListener("click", () => {
  const text = document.getElementById("codeOutput").textContent;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById("copyBtn");
    btn.textContent = "Copied!";
    setTimeout(() => {
      btn.textContent = "Copy";
    }, 1500);
  });
});

// Auto-generate on workspace change (debounced)
let debounceTimer;
workspace.addChangeListener(() => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(generate, 400);
});

generate();
