'use strict';

const { Router } = require('express');
const User = require('./../models/user');
const Path = require('./../models/path');
const uploader = require('./../middleware/uploader');
const routeGuard = require('./../middleware/route-guard');
const bindUser = require('./../middleware/bind-user-to-view-locals');

const router = new Router();

router.get('/create', (req, res, next) => {
  const google = res.locals.environment.GOOGLE_API_KEY;
  res.render('path/create', { google });
});

router.get('/edit', (req, res, next) => {
  res.render('path/edit');
});

router.get('/searchpaths', (req, res, next) => {
  res.render('path/searchpaths');
});

//Themes routes
router.get('/cultural', (req, res, next) => {
  Path.find({ type: 'Cultural' })
    .then(value => {
      res.render('holdthemes/cultural', { value });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/city', (req, res, next) => {
  Path.find({ type: 'City' })
    .then(value => {
      res.render('holdthemes/city', { value });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/country', (req, res, next) => {
  Path.find({ type: 'Country' })
    .then(value => {
      res.render('holdthemes/country', { value });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/party', (req, res, next) => {
  Path.find({ type: 'Party' })
    .then(value => {
      res.render('holdthemes/party', { value });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/romantic', (req, res, next) => {
  Path.find({ type: 'Romantic' })
    .then(value => {
      res.render('holdthemes/romantic', { value });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/sea', (req, res, next) => {
  Path.find({ type: 'Sea' })
    .then(value => {
      res.render('holdthemes/sea', { value });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/sport', (req, res, next) => {
  Path.find({ type: 'Sport' })
    .then(value => {
      res.render('holdthemes/sport', { value });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/wildlife', (req, res, next) => {
  Path.find({ type: 'Wildlife' })
    .then(value => {
      res.render('holdthemes/wildlife', { value });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/gastronomic', (req, res, next) => {
  Path.find({ type: ['Gastronomic'] })
    .then(value => {
      res.render('holdthemes/gastronomic', { value });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/shopping', (req, res, next) => {
  Path.find({ type: 'Shopping' })
    .then(value => {
      res.render('holdthemes/shopping', { value });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/animals', (req, res, next) => {
  Path.find({ type: 'Animals' })
    .then(value => {
      res.render('holdthemes/animals', { value });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/fun', (req, res, next) => {
  Path.find({ type: 'Fun' })
    .then(value => {
      res.render('holdthemes/fun', { value });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/create', routeGuard(true), bindUser, uploader.single('picture'), (req, res, next) => {
  const userId = req.user._id;
  const author = req.user.username;
  const { description } = req.body;
  const { type } = req.body;
  const { name } = req.body;
  const { title } = req.body;
  const { lat } = req.body;
  const { lng } = req.body;

  const location = title.reduce((accum, value, index) => {
    const data = {
      title: value,
      lat: lat[index],
      lng: lng[index]
    };
    return (accum = [...accum, data]);
  }, []);

  if (req.file == null || undefined) {
    Path.create({
      user: userId,
      author,
      name,
      location,
      type,
      description
    })
      .then(newPath => {
        res.redirect(`/path/${newPath._id}`);
      })
      .catch(error => next(error));
  } else {
    const { url } = req.file;
    Path.create({
      user: userId,
      author,
      name,
      location,
      type,
      description,
      picture: url
    })
      .then(newPath => {
        res.redirect(`/path/${newPath._id}`);
      })
      .catch(error => next(error));
  }
});

router.get('/:pathid', (req, res, next) => {
  const pathid = req.params.pathid;
  const google = res.locals.environment.GOOGLE_API_KEY;
  Path.findById(pathid)
    .then(value => {
      res.render('path/single', { value, google });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
