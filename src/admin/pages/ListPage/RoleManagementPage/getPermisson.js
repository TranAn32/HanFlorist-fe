// pages/ListPage/GetPermissionByRole/GetPermissionByRole.js
import React, { useState, useEffect } from "react";
import { useAuth } from "../../../AuthContext";
import { get } from "../../../../share/utils/http";

const GetPermissionByRole = () => {
  const { token } = useAuth(); // Lấy token từ AuthContext
  const [data, setData] = useState(null);
  const [error, setError] = useState(null); 

  // Lấy danh sách roles và permissions từ API
  useEffect(() => {
    const fetchRolesAndPermissions = async () => {
      try {
        const result = await get(token, "/admin/roles");

        // Lấy danh sách roles và permissions
        const rolesData = result.data.roles || [];

        // Định dạng dữ liệu để trả về
        const formattedData = rolesData.map((role) => ({
          roleId: role._id,
          roleTitle: role.title,
          permissions: role.permissions || [],
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách roles:", error);
        setError(error.message);
      }
    };

    if (token) {
      fetchRolesAndPermissions();
    }
  }, [token]);

  // Trả về dữ liệu dưới dạng JSON
  if (error) {
    return <pre>{JSON.stringify({ error }, null, 2)}</pre>;
  }

  if (!data) {
    return <pre>{JSON.stringify({ message: "Đang tải dữ liệu..." }, null, 2)}</pre>;
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default GetPermissionByRole;