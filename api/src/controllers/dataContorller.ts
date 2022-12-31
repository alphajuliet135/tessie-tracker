import axios from 'axios';
import { Request, Response } from 'express';
import { TeslaScopeGetData } from '../models/teslascopeData';
import { PermissionGroup } from '../models/userManagement';

export const getData = async (req: Request, res: Response) => {
  try {
    const currentTeslaData = await axios.get(`${process.env.TESLASCOPE_URL}?api_key=${process.env.TESLASCOPE_APIKEY}`, {
      headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
    });

    // return res.status(200).send(currentTeslaData.data);
    // Db call to get permission group, more dynamic. Changes easier to see
    // Todo make typecheck
    const permissionGroupCurrentUser: PermissionGroup = 2;

    switch (permissionGroupCurrentUser) {
      case PermissionGroup.Admin:
        return res.status(200).send(currentTeslaData.data);
      case PermissionGroup.PremiumViewer:
        return res.status(200).send(currentTeslaData.data);
      default:
        return res.status(200).send({
          lat: currentTeslaData.data.response.vehicle.latitude,
          long: currentTeslaData.data.response.vehicle.longitude,
        });
    }
  } catch (error) {
    res.status(401).send('Error while fetching data from TeslaScope');
    console.error(error);
  }
};
