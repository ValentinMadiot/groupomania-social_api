// import { Menu } from "@mantine/core";
// import { IconAdjustmentsAlt, IconEdit, IconTrash } from "@tabler/icons";

// const [menuOpened, setMenuOpened] = useState(false);

// function OptionPost({ menuOpened, setMenuOpened, post }) {
//   return (
//     <Menu
//       classNames="postProfilOption"
//       position="left-start"
//       offset={2}
//       withArrow
//       shadow="md"
//       width={120}
//       opened={menuOpened}
//       onClose={() => setMenuOpened(false)}>
//       <Menu.Target>
//         <button className="postProfilOption">
//           <IconAdjustmentsAlt />
//         </button>
//       </Menu.Target>

//       <Menu.Dropdown>
//         <Menu.Label>Paramètres</Menu.Label>
//         <Menu.Divider />
//         <Menu.Item icon={<IconEdit size={14} />}>Modifier</Menu.Item>
//         <Menu.Item color="red" icon={<IconTrash size={14} />}>
//           Supprimer
//         </Menu.Item>
//       </Menu.Dropdown>
//     </Menu>
//   );
// }