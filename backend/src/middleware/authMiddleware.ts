import { Request, Response, NextFunction } from 'express';

//add user and firm to the request interface
declare global {
  namespace Express {
    interface Request {
      user: string;
      firm: string;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const userToken = req.headers.authorization
    ? JSON.parse(req.headers.authorization)
    : null;

  if (!userToken) {
    res.status(401).json({ msg: 'Unauthorized. No user provided.' }).end();
    return;
  }

  //TODO: IMplement a proper middleware to protect admin routes - currently this approach has serious loopholes - it just checks if the user is an admin based on the token, however, it does not prevent normal firm users from accessing the admin routes. Similarly, an admin can access firm routes without a firm ID - which require firm context to function properly
  if (userToken.marketplace.isAdmin) {
    // If the user is an admin, don't check for firm ID
    req.user = userToken.uuid;
    next();
    return;
  }

  //for the case when user has just logged in, and the firm selection screen is shown
  if (req.path === '/api/user/firms') {
    //set req.user to the user uuid
    req.user = userToken.uuid;
    next();
    return;
  }

  const firmId = req.headers['x-firm-id'];

  if (!firmId) {
    res.status(400).json({ msg: 'Bad Request. Firm ID is required.' }).end();
    return;
  }

  const firmExistsInToken = userToken.workpapers.firms.find(
    (firm: any) => firm.id === firmId
  );

  if (!firmExistsInToken) {
    res.status(401).json({ msg: `You don't have access to this firm` }).end();
    return;
  } else {
    req.user = userToken.uuid;
    req.firm = firmId as string;

    next();
  }
};
