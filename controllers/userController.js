var db = require("../models");
var User = db.user;
var Contact = db.contact;
const { Sequelize } = require("sequelize");

const addUser = async (req, res) => {
  const jane = await User.create({ firstName: "Robin", lastName: "Hood" });
  console.log(jane instanceof User); // true
  console.log(jane.name); // "Jane"
  await jane.save();
  console.log("jane was saved successfully");
  console.log(jane.toJSON());
  res.status(200).json(jane.toJSON());
};

const getUsers = async (req, res) => {
  const data = await User.findAll({});
  res.status(200).json({ data: data });
};

const getUser = async (req, res) => {
  const data = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ data: data });
};

const postUser = async (req, res) => {
  console.log(req.body);
  const postData = req.body;
  if (postData.length > 1) {
    const data = await User.bulkCreate(postData);
  } else {
    const data = await User.create(postData);
  }

  res.status(200).json({ data: data });
};

const deleteUser = async (req, res) => {
  const data = await User.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ data: data });
};

const patchUser = async (req, res) => {
  const updatedData = req.body;
  const data = await User.update(updatedData, {
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ data: data });
};

const queryUser = async (req, res) => {
  const data = await User.findAll({
    order: [["id", "DESC"]],
  });

  res.status(200).json({ data: data });
};

const findeUser = async (req, res) => {
  const data = await User.findByPk(3);

  res.status(200).json({ data: data });
};

const getSetVirtual = async (req, res) => {
  const data = await User.findAll({
    where: {
      lastName: "Khatik",
    },
  });

  res.status(200).json({ data: data });
};

const validateUser = async (req, res) => {
  console.log(req.body, req.file.path);
  const data = {};
  try {
    const data = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      image: req.file.path,
    });
    res.status(200).json({ data: data });
  } catch (e) {
    console.log(e);
    res.status(400).json({ e });
  }
};

const oneToOneUser = async (req, res) => {
  // const data = await User.create({firstName:'kumar', lastName:'udas'})

  // if(data && data.id){
  //   await Contact.create({permanent_address:'abc', current_address:'xyz', user_id: data.id})
  // }

  // const data = await User.findAll({
  //   attributes:['firstName', 'lastName'],
  //   include:[{
  //     model:Contact,
  //     as:'contactDetails',
  //     attributes:['permanent_address', 'current_address']
  //   }],
  //   where:{
  //     id:2
  //   }
  // });

  const data = await Contact.findAll({
    attributes: ["permanent_address", "current_address"],
    include: [
      {
        model: User,
        as: "userDetails",
        attributes: ["firstName", "lastName"],
      },
    ],
    where: {
      id: 2,
    },
  });
  res.status(200).json({ data: data });
};

const oneToManyUser = async (req, res) => {
  // await Contact.create({
  //   permanent_address: "Delhi",
  //   current_address: "noida",
  //   user_id: 2,
  // });

  // const data = await User.findAll({
  //     attributes:['firstName', 'lastName'],
  //     include:[{
  //       model:Contact,
  //       as:'contactDetails',
  //       attributes:['permanent_address', 'current_address']
  //     }],
  //     where:{
  //       id:2
  //     }
  //   });

    const data = await Contact.findAll({
      attributes: ["permanent_address", "current_address"],
      include: [
        {
          model: User,
          as: "userDetails",
          attributes: ["firstName", "lastName"],
        },
      ],
      where: {
        id: 2,
      },
    });
  res.status(200).json({ data: data });
};

const manyToManyUser = async (req, res) => {
 var data ={};
  data = await User.create({firstName:'kumar', lastName:'sanu'})

  if(data && data.id){
    await Contact.create({permanent_address:'abcd', current_address:'xyzl'})
  }
  // data = await Contact.findAll({
  //   attributes: ["permanent_address", "current_address"],
  //   include: [
  //     {
  //       model: User,
  //       as: "userDetails",
  //       attributes: ["firstName", "lastName"],
  //     },
  //   ], 
  //   where: {
  //     id: 2,
  //   },
  // });
    res.status(200).json({ data: data });
}

module.exports = {
  addUser,
  getUsers,
  getUser,
  postUser,
  deleteUser,
  patchUser,
  queryUser,
  findeUser,
  getSetVirtual,
  validateUser,
  oneToOneUser,
  oneToManyUser,
  manyToManyUser
};
