



/*useState:

const [data, setData] = useState([]);: Sử dụng Hook useState để tạo một state data với giá trị khởi tạo là một mảng rỗng.
useEffect:

useEffect(() => { getOrgs(); }, []);: Sử dụng Hook useEffect để gọi hàm getOrgs khi component được render lần đầu tiên. Hàm này sẽ gọi API để lấy danh sách tổ chức từ server và cập nhật state data.
getOrgs:

const getOrgs = async () => { ... }: Hàm này thực hiện việc gọi API (/admin/org-list) để lấy danh sách tổ chức từ server. Kết quả trả về được lưu vào state data.
handleDelete:

const handleDelete = async (id) => { ... }: Hàm này thực hiện xóa một tổ chức dựa trên id. Trước khi xóa, nó hiển thị một prompt để xác nhận từ người dùng. Sau khi xóa, nó thông báo kết quả và tải lại trang để cập nhật hiển thị.
Render:

Trong phần render, component này trả về một đối tượng JSX:
Hiển thị một bảng (<table>) với các cột là thông tin của tổ chức.
Sử dụng dữ liệu trong state data để map và hiển thị thông tin từng tổ chức trong các dòng của bảng.*/