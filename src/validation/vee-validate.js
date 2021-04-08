import {Validator} from "vee-validate";

export const dictionary = {
    locale: '',
    dictionary: {
        vi: {
            messages: {
                required: () => 'Trường này là bắt buộc',
                min_value: (field, args) => 'Giá trị phải lớn hơn hoặc bằng ' + args,
                max_value: (field, args) => 'Giá trị phải nhỏ hơn hoặc bằng ' + args,
            },
            custom: {
                username: {
                    required: 'Bạn chưa nhập tên đăng nhập',
                    min: 'Tên đăng nhập phải trên 4 ký tự',
                },
                password: {
                    required: 'Bạn chưa nhập mật khẩu',
                    min: 'Độ dài mật khẩu ngắn nhất cho phép là 4',
                    max: 'Độ dài mật khẩu dài nhất cho phép là 32',
                },
            }
        },
        en: {
            custom: {}
        }
    }
}
Validator.localize('vi');
export default dictionary
