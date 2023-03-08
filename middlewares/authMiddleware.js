const jwt=require('jsonwebtoken');

const requireAuth=(req,res,next)=>{
    const token=req.cookies.jwt;

    //check json web tocken exists & is verified
    if(token){
        jwt.verify(token,'User information secret',(err,decodedToken)=>{
            if (err) {
                console.log(err.message);
                res.send('Login Page');
              } else {
                console.log(decodedToken);
                const { role } = decodedToken;
                if (role === 'Patient') {
                  req.userRole = 'Patient';
                  next();
                } else if (role === 'Doctor') {
                  req.userRole = 'Doctor';
                  next();
                }else if (role === 'Admin') {
                  req.userRole = 'Admin';
                  next();
                }
                 else {
                  res.send('Login Page');
                }
              }
            });
    }
    else{
        res.send('Login Page');
    }
}
const requireAuthAdmin=(req,res,next)=>{
  const token=req.cookies.jwt;

  //check json web tocken exists & is verified
  if(token){
      jwt.verify(token,'Admin information secret',(err,decodedToken)=>{
          if (err) {
              console.log(err.message);
              res.send('Admin Login Page');
            } else {
              console.log(decodedToken);
              next();
            }
          });
  }
  else{
      res.send('Admin Login Page');
  }
}

module.exports={requireAuth,requireAuthAdmin};