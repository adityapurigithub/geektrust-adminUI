import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Table from "./Table";
const Home = () => {
  const [userData, setuserData] = useState([]);
  const [query, setQuery] = useState("");
  const [del, showDel] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [currPage, setCurrPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [allSelect, setAllSelect] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const data = await resp.json();
      setuserData(data);
      // console.log(data);
      console.log(userData);
    };
    fetchData();
  }, []);

  const indexLast = currPage * rowPerPage; // 1*10
  const indexFirst = indexLast - rowPerPage; //10-10
  const currUsers = userData.slice(indexFirst, indexLast); //0,10

  const handleSearch = (e) => {
    setQuery(e.target.value);
    console.log(filtUser);
  };

  const handleChange = (e) => {
    const { checked, name } = e.target;
    console.log(checked);
    if (name === "all") {
      setAllSelect(!allSelect);
      const tempUser = userData.map((user) => {
        return { ...user, isChecked: checked };
      });
      setuserData(tempUser);
    } else {
      var tempUser = userData.map((user) =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      setuserData(tempUser);
    }
  };

  const handleDelete = (e) => {
    const { id } = e.target;
    if (id === "all") {
      window.alert("All users will be deleted!!!");
      // console.log("all");
      userData.splice(0);
      let tempUser = userData;
      setuserData(tempUser);
    }

    let tempUser = userData.filter((user) => user.id !== id);
    setuserData(tempUser);
  };
  const handleEdit = (id) => {
    // console.log(id);
    let tempUser = userData;
    tempUser[id].edit = true;
    setuserData(tempUser);
    console.log(tempUser);
    setEditMode(!editMode);
  };
  const handleSaveUser = (id, name, email, role) => {
    console.log(id);
    let tempUser = userData;
    tempUser[id].name = name.current.value;
    tempUser[id].email = email.current.value;
    tempUser[id].role = role.current.value;
    tempUser[id].edit = false;
    setuserData(tempUser);
    console.log(tempUser);
    setEditMode(!editMode);
  };

  const paginate = (pageNo) => {
    setCurrPage(pageNo);
  };
  const handlePrevClick = (pageNo) => {
    setCurrPage(pageNo - 1);
  };

  const handleNextClick = (pageNo) => {
    setCurrPage(pageNo + 1);
  };

  const filtUser = currUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
  );
  return (
    <div>
      <Table
        isChecked={userData?.isChecked}
        query={query}
        del={del}
        handleSearch={handleSearch}
        handleDelete={handleDelete}
        handleChange={handleChange}
        currUsers={currUsers}
        handleEdit={handleEdit}
        editMode={editMode}
        filtUser={filtUser}
        handleSaveUser={handleSaveUser}
        allSelect={allSelect}
      />

      {filtUser.length !== 0 ? (
        <Pagination
          totalData={userData.length}
          rowPerPage={rowPerPage}
          handlePrevClick={handlePrevClick}
          handleNextClick={handleNextClick}
          currPage={currPage}
          paginate={paginate}
        />
      ) : null}
    </div>
  );
};

export default Home;
