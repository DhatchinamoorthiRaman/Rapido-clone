module.exports.cookies = ((req, res, next) => {
    // Parse the Cookie header manually
    const id= req.cookies.id;
    
    // if (cookies) {
    //   const cookiesArray = cookies.split('; ');
    //   req.parsedCookies = {};
  
    //   cookiesArray.forEach(cookie => {
    //     const [name, value] = cookie.split('=');
    //     req.parsedCookies[name] = value;
    //   });
    // } else {
    //   req.parsedCookies = {};
    // }
    req.id=id;
  
    next();
  });