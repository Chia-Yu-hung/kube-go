import { readdirSync } from "fs"
import { homedir } from "os"
import { Action, ActionPanel, closeMainWindow, Icon, List } from "@raycast/api"
import open from "open"
import { openTerminalAndRunScript } from "./iternimalCtl"

const items = readdirSync(`${homedir()}/.kube`)
  .filter((file) => file.split(".").length > 2)
	.map((config) => {
		const url = `https://${config.split(".").slice(0,4).join(".")}:30000`
    return { title: config, url };
  });

export default function Command() {
  return (
    <List searchBarPlaceholder="Filter by title...">
      {items.map((item) => (
        <List.Item
          key={item.title}
          icon={{ source: Icon.Link }}
          title={item.title}
          actions={
            <ActionPanel>
							<Action title="Open Dashboard" onAction={() => { closeMainWindow(); open(item.url, { app: { name: 'firefox' } }) }} />
							<Action title="Open iTerm" onAction={() => { closeMainWindow(); openTerminalAndRunScript(`export KUBECONFIG=~/.kube/${item.title}`) }} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  )
}
