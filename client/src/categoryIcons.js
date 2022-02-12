const iconNames = [
  "book",
  "music",
  "microphone",
  "camera",
  "video",
  "film",
  "youtube",
  "paint brush",
  "pencil alternate",
  "futbol",
  "basketball ball",
  "volleyball ball",
  "table tennis",
  "graduation cap",
  "home",
  "leaf",
  "map signs",
  "bicycle",
  "motorcycle",
  "car",
  "plane",
  "wrench",
  "heart",
  "heartbeat",
  "briefcase",
  "suitcase",
  "coffee",
  "calendar",
  "clipboard",
  "tasks",
  "university",
  "trophy",
  "desktop",
  "code",
  "calculator",
  "cloud",
  "cubes",
  "gamepad",
  "industry",
  "money bill alternate",
  "hand spock",
  "handshake",
  "users",
  "circle",
  "ellipsis horizontal"
]

const icons = iconNames.map(myIcon => {
  return {
    label: "",
    value: myIcon,
    icon: myIcon
  }
})

export default icons;