export const displayLink = (room, campus) => {
  if (
    Object.is(campus, "Internet") ||
    Object.is(campus, "Off-Campus - Domestic") ||
    Object.is(campus, "Macomb") ||
    Object.is(room.trim(), "N/A")
  ) {
    return false
  } else {
    return true
  }
}
export const getMapUrl = (buildingRoom, instructor) => {
  let building = buildingRoom

  if (instructor === true) {
    building = building.substring(building.indexOf(" "), building.length)
    building = building.trim()
    building = building.toUpperCase()
  } else {
    building = building.substring(0, building.indexOf(" "))
    building = building.trim()
    building = building.toUpperCase()
  }

  let url

  switch (building) {
    case "DH":
    case "DHE":
    case "DODGE HALL":
      url =
        "https://www.myatlascms.com/map/index.php?id=566#!ct/5468,6596,6597,6598,6600?m/71380"
      break
    case "SFH":
    case "SOUTH FOUNDATION HALL":
      url =
        "https://www.myatlascms.com/map/index.php?id=566#!ct/5468,6596,6597,6598,6600?m/71375"
      break
    case "ODH":
    case "O'DOWD HALL":
      url =
        "https://www.myatlascms.com/map/index.php?id=566#!ct/5468,6596,6597,6598,6600?m/71376"
      break
    case "HH":
    case "HHS":
    case "HANNAH HALL":
      url =
        "https://www.myatlascms.com/map/index.php?id=566#!ct/5468,6596,6597,6598,6600?m/65259"
      break
    case "MSC":
    case "SEB":
    case "SB":
    case "MATH AND SCIENCE CENTER":
    case "SCIENCE AND ENGINEERING BUILDING":
      url =
        "https://www.myatlascms.com/map/index.php?id=566#!ct/5468,6596,6597,6598,6600?m/65260"
      break
    case "NFH":
    case "NORTH FOUNDATION HALL":
      url =
        "https://www.myatlascms.com/map/index.php?id=566#!ct/5468,6596,6597,6598,6600?m/71374"
      break
    case "OC":
    case "OAKLAND CENTER":
      url =
        "https://www.myatlascms.com/map/index.php?id=566#!ct/5468,6596,6597,6598,6600?m/71373"
      break
    case "WH":
    case "WILSON HALL":
      url =
        "https://www.myatlascms.com/map/index.php?id=566#!ct/5468,6596,6597,6598,6600?m/71372"
      break
    case "PH":
    case "PAWLEY HALL":
      url =
        "https://www.myatlascms.com/map/index.php?id=566#!ct/5468,6596,6597,6598,6600?m/71385"
      break
    case "VAR":
    case "VH":
    case "VARNER HALL":
      url =
        "https://www.myatlascms.com/map/index.php?id=566#!ct/5468,6596,6597,6598,6600?m/71384"
      break
    case "EH":
    case "ELLIOT HALL":
      url =
        "https://www.myatlascms.com/map/index.php?id=566#!ct/5468,6596,6597,6598,6600?m/71383"
      break
    case "EC":
    case "ENGINEERING CENTER":
      url =
        "https://www.myatlascms.com/map/index.php?id=566#!ct/5468,6596,6597,6598,6600?m/71382"
      break
    case "MBT":
    case "MEADOW BROOK THEATER":
      url =
        "http://www.myatlascms.com/map/index.php?id=566#!ct/5468,6596,6597,6598,6600,11259?m/71371"
      break
    case "KL":
    case "LIB":
    case "KRESGE LIBRARY":
      url =
        "https://www.myatlascms.com/map/index.php?id=566#!ct/5468,6596,6597,6598,6600?m/65266"
      break
    case "REC":
    case "AC":
    case "REC CENTER":
      url =
        "https://www.myatlascms.com/map/index.php?id=566#!ct/5468,6596,6597,6598,6600?m/65262"
      break
    case "HHB":
    case "HUMAN HEALTH BUILDING":
      url =
        "https://www.myatlascms.com/map/index.php?id=566#!ct/5468,6596,6597,6598,6600?m/71369"
      break
    case "GHC":
    case "GRAHAM HEALTH CENTER":
      url =
        "https://www.myatlascms.com/map/index.php?id=566#!ct/5468,6596,6597,6598,6600?m/71370"
      break
    case "OVH":
    case "OAKVIEW HALL":
      url =
        "https://www.myatlascms.com/map/index.php?id=566#!ct/5468,6596,6597,6598,6600?m/71390"
      break
    case "VBH":
    case "WVH":
    case "VANDENBERG HALL":
      url =
        "https://www.myatlascms.com/map/index.php?id=566#!ct/5468,6596,6597,6598,6600?m/65256"
      break
    case "HAM":
    case "HAMLIN HALL":
      url =
        "https://www.myatlascms.com/map/index.php?id=566#!ct/5468,6596,6597,6598,6600?m/65257"
      break
    case "VWH":
    case "VAN WAGONER HOUSE":
      url =
        "https://www.myatlascms.com/map/index.php?id=566#!ct/5468,6596,6597,6598,6600?m/73413"
      break
    case "HIL":
    case "HILL HOUSE":
      url =
        "https://www.myatlascms.com/map/index.php?id=566#!ct/5468,6596,6597,6598,6600?m/65258"
      break
    case "FTZ":
    case "FITZGERALD HOUSE":
      url =
        "https://www.myatlascms.com/map/index.php?id=566#!ct/5468,6596,6597,6598,6600?m/71387"
      break
    case "ANI":
    case "ANIBAL HOUSE":
      url =
        "https://www.myatlascms.com/map/index.php?id=566#!ct/5468,6596,6597,6598,6600?m/71388"
      break
    case "PRY":
    case "PRYALE HOUSE":
      url =
        "https://www.myatlascms.com/map/index.php?id=566#!ct/5468,6596,6597,6598,6600?m/71389"
      break
    case "JDH":
    case "JOHN DODGE HOUSE":
      url =
        "https://www.myatlascms.com/map/index.php?id=566#!ct/5468,6596,6597,6598,6600?m/71402"
      break
    default:
      url =
        "https://www.myatlascms.com/map/index.php?id=566#!ct/5468,6596,6597,6598,6600"
      break
  }
  return url
}
