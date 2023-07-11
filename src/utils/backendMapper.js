/* eslint-disable no-underscore-dangle */
function mapBackendToFrontend(data) {
  return data.map((item) => ({
    ...item,
    id: item._id,
  }));
}

export default mapBackendToFrontend;
