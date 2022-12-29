import axios from 'axios';
import { Request, Response } from 'express';
import { TeslaScopeGetData } from '../models/teslascopeData';
import { PermissionGroup } from '../models/userManagement';

export const getData = async (req: Request, res: Response) => {
  try {
    const currentTeslaData = await axios.get(`${process.env.TESLASCOPE_URL}?api_key=${process.env.TESLASCOPE_APIKEY}`, {
      headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
    });

    return res.status(200).send(currentTeslaData.data);
    // Get permisson group from db for user (maybe through signed token, no db call)
    // const permissionGroupCurrentUser: PermissionGroup = 2;

    // switch (permissionGroupCurrentUser) {
    //   case PermissionGroup.Admin:
    //     return res.status(200).send(currentTeslaData);
    //   case PermissionGroup.PremiumViewer:
    //     return res.status(200).send(currentTeslaData);
    //   default:
    //     return res.status(200).send({
    //       lat: currentTeslaData.response.vehicle.latitude,
    //       long: currentTeslaData.response.vehicle.longitude,
    //     });
    // }
  } catch (error) {
    res.status(401).send('Error while fetching data from TeslaScope');
    console.error(error);
  }
};
