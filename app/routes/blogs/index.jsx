import { Link, useLoaderData } from "remix";
import { useState } from "react";
import { DetailRightBar } from "../../components/DetailRightBar.js";
import { ShortText } from "../../components/form/ShortText";
import { Email } from "../../components/form/Email";
import { Password } from "../../components/form/Password";
import { LongText } from "../../components/form/LongText";
import { PhoneNumber } from "../../components/form/PhoneNumber";
import { SingleSelect } from "../../components/form/SingleSelect";
import { FormModal } from "../../components/Modal";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// export let loader = () => {
//   return getPosts();
// };

// export let links = () => {
//   return [{ rel: "stylesheet", href: postStyles }];
// };

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function Posts() {
  //   let posts = useLoaderData();
  const [tesModalVisible, setTesModalVisible] = useState(false);
  // console.log(posts);
  let [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    description: "",
    phone: 0,
    type: "",
  });
  const [userModalVisible, setUserModalVisible] = useState(false);
  return (
    <div className="px-5 py-5 relative">
      <div className="text-2xl font-bold text-blue-500">My Remix Blog</div>
      <p>Click on the post name to read the uhuy</p>
      <ul>
        {/* {posts.map((post) => (
          <li className="postList" key={post.slug}>
            <Link className="postTitle" to={post.slug}>
              {post.title}
            </Link>
          </li>
        ))} */}
      </ul>
      <motion.a
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 1 }}
        href="#"
        onClick={() => {
          setTesModalVisible(true);
          // setUserModalVisible(true);
        }}
        className="text-blue-500"
      >
        <FontAwesomeIcon icon="globe" size="xs" spin />
        Tes
      </motion.a>
      <ShortText
        label="Username"
        required
        placeholder="Ketikkan username akun Anda di sini"
        value={formData.username}
        formData={formData}
        onChange={(e) => {
          setFormData({
            ...formData,
            username: e.target.value,
          });
        }}
      />
      <Email
        label="Email"
        required
        placeholder="Ketikkan email akun Anda di sini"
        value={formData.email}
        formData={formData}
        onChange={(e) => {
          setFormData({
            ...formData,
            email: e.target.value,
          });
        }}
      />
      <Password
        label="Password"
        required
        placeholder="Ketikkan password akun Anda di sini"
        value={formData.password}
        formData={formData}
        onChange={(e) => {
          setFormData({
            ...formData,
            password: e.target.value,
          });
        }}
      />
      <LongText
        maxRows={5}
        label="Deskripsi"
        required
        placeholder="Ketikkan deskripsi akun Anda di sini"
        value={formData.description}
        formData={formData}
        onChange={(e) => {
          setFormData({
            ...formData,
            description: e.target.value,
          });
        }}
      />
      <PhoneNumber
        label="Nomor Telepon"
        placeholder="Nomor Telepon"
        required
        value={formData.phone}
        onChange={(e) => {
          setFormData({
            ...formData,
            phone: e.target.value,
          });
        }}
      />
      <SingleSelect
        label="Jenis Pesan"
        required
        value={formData.type}
        onChange={(e) => {
          setFormData({
            ...formData,
            type: e.target.value,
          });
        }}
        options={["Oke", "Sip"]}
      />

      <FormModal
        onClose={() => {
          setUserModalVisible(false);
        }}
        visible={userModalVisible}
        size="md"
      >
        <div className="w-full md:flex md:flex-col mx-auto justify-center md:px-8 relative">
          <div className="w-full text-center md:px-20">
            <div className="text-black text-lg font-bold w-full text-center pt-5 mb-3">
              Masuk
            </div>
          </div>

          <div
            className="absolute top-0 right-0 cursor-pointer"
            onClick={() => {
              setUserModalVisible(false);
            }}
          >
            <FontAwesomeIcon
              icon="times"
              className="text-gray-300 hover:text-red-500"
            />
          </div>
        </div>
      </FormModal>
      <DetailRightBar
        width="w-full md:w-5/12"
        onClose={() => {
          setTesModalVisible(false);
        }}
        show={tesModalVisible}
      >
        <div>Tes</div>
      </DetailRightBar>
    </div>
  );
}
