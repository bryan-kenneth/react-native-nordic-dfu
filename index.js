import { NativeModules, NativeEventEmitter } from "react-native";

const { RNNordicDfu } = NativeModules;
const NordicDFU = { startDFU };

function rejectPromise(message) {
  return new Promise((resolve, reject) => {
    reject(new Error("NordicDFU.startDFU: " + message));
  });
}

/**
 * 
 * Starts the DFU process
 * 
 * @param {Object} obj
 * @param {string} obj.deviceAddress The MAC address for the device that should be updated
 * @param {string} [obj.deviceName = null] The name of the device in the update notification
 * @param {string} obj.filePath The file system path to the zip-file used for updating
 * @returns {Promise} A promise that resolves or rejects with the `deviceAddress` in the return value
 * 
 * @example
 * import { NordicDFU, DFUEmitter } from "react-native-nordic-dfu";
 * 
 * NordicDFU.startDFU({
 *   deviceAddress: "C3:53:C0:39:2F:99",
 *   name: "Pilloxa Pillbox",
 *   filePath: "/data/user/0/com.nordicdfuexample/files/RNFetchBlobTmp4of.zip"
 * })
 *   .then(res => console.log("Transfer done:", res))
 *   .catch(console.log);
 */
function startDFU({ deviceAddress, deviceName = null, filePath }) {
  if (deviceAddress == undefined) {
    return rejectPromise("No deviceAddress defined");
  }
  if (filePath == undefined) {
    return rejectPromise("No filePath defined");
  }
  const upperDeviceAddress = deviceAddress.toUpperCase();
  return RNNordicDfu.startDFU(upperDeviceAddress, deviceName, filePath);
}

/**
 * Event emitter for DFU state and progress events
 * 
 * @const DFUEmitter
 * 
 * @example
 * import { NordicDFU, DFUEmitter } from "react-native-nordic-dfu";
 * 
 * DFUEmitter.addlistener("DFUProgress", progress => {
 *   console.log("DFU progress:", progress);
 * });
 * 
 * DFUEmitter.addListener("DFUStateChanged", state => {
 *   console.log("DFU State:", state);
 * })
 */
const DFUEmitter = new NativeEventEmitter(RNNordicDfu);

export { NordicDFU, DFUEmitter };