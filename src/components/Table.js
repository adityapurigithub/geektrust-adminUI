import React, { useRef } from "react";

const Table = ({
  isChecked,
  query,
  del,
  handleChange,
  handleDelete,
  handleSearch,
  currUsers,
  handleEdit,
  editMode,
  filtUser,
  handleSaveUser,
  allSelect,
}) => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const roleRef = useRef(null);
  return (
    <div>
      <div className="box">
        <div className="search-box">
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Search Using Name, Email or Role..."
          />
          {/* <button>search</button> */}
        </div>
        {allSelect && filtUser.length !== 0 ? (
          <div className="del-all-btn">
            <button
              id="all"
              src="https://cdn-icons-png.flaticon.com/512/3096/3096687.png"
              alt="del-icon"
              onClick={handleDelete}
            >
              Delete All
            </button>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="admin-layout">
        {currUsers.length !== 0 && filtUser.length !== 0 ? (
          <div className="row">
            <span className="check-box">
              <input
                type="checkBox"
                name="all"
                onChange={handleChange}
                checked={
                  filtUser.filter((user) => user.isChecked !== true).length < 1
                }
              />
            </span>
            <span>
              <b>Name</b>
            </span>
            <span className="email">
              <b>Email</b>
            </span>
            <span>
              <b>Role</b>
            </span>
            <span>
              <b>Actions</b>
            </span>
          </div>
        ) : null}

        {currUsers.length === 0 ? (
          <h2>Deleted!!!</h2>
        ) : //filtering acc. to any property and then mapping over arr
        filtUser.length === 0 ? (
          <h3>
            User With This Name Not found !!!
            <br />
            Please Search Using Diffrent Name or Email.
          </h3>
        ) : (
          filtUser.map((data, i) => {
            return (
              <div
                className="row"
                style={{
                  transition: "ease 0.4s",
                  backgroundColor: `${data?.isChecked ? "lightGray" : ""}`,
                }}
              >
                <span className="check-box">
                  <input
                    type="checkBox"
                    name={data.name}
                    checked={data?.isChecked || false}
                    onChange={handleChange}
                  />
                </span>
                {!data.edit ? (
                  <>
                    <span>{data.name}</span>
                    <span className="email">{data.email}</span>
                    <span>{data.role}</span>
                  </>
                ) : (
                  <>
                    <span>
                      <input defaultValue={data.name} ref={nameRef} />
                    </span>
                    <span>
                      <input defaultValue={data.email} ref={emailRef} />
                    </span>
                    <span>
                      <input defaultValue={data.role} ref={roleRef} />
                    </span>
                  </>
                )}
                <span>
                  {!data.edit ? (
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1827/1827933.png"
                      height="15"
                      alt="icon"
                      style={{
                        padding: "0 15px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleEdit(i)}
                    />
                  ) : (
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/482/482459.png"
                      height="15"
                      alt="saveIcon"
                      style={{
                        padding: "0 15px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        handleSaveUser(i, nameRef, emailRef, roleRef)
                      }
                    />
                  )}

                  {data?.isChecked ? (
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3096/3096687.png"
                      height="15"
                      alt="icon"
                      style={{
                        padding: "0 10px",
                        cursor: "pointer",
                      }}
                      id={data.id}
                      onClick={handleDelete}
                    />
                  ) : null}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Table;
