import CreatableSelect from "react-select/creatable";
import { useEffect, useState } from "react";
import { ApiCategory } from "../../services/Api";
import { useEditor } from "../../providers/useEditor";

export default function OptionCategory() {
    const { post, setPost }: any = useEditor();
    const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
    const [options, setOptions] = useState<any[]>([]);

    const handleSelectChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
        setPost({
            ...post,
            categoryIds: selectedOptions.map((option) => option._id),
        });
    };
    useEffect(() => {
        const fectch = async () => {
            try {
                const categories = await ApiCategory.getAll();

                setOptions(
                    categories.map((option) => ({
                        _id: option._id,
                        value: option.name,
                        label: option.name,
                    }))
                );
            } catch (error) {}
        };
        fectch();
    }, []);

    useEffect(() => {
        const lastSelectedOption = selectedOptions[selectedOptions.length - 1];

        const fectchCreate = async () => {
            console.log("Creating");
            try {
                const newCategory = await ApiCategory.createCategory({
                    name: lastSelectedOption.value,
                });
                setOptions([
                    ...options,
                    {
                        _id: newCategory._id,
                        ...lastSelectedOption,
                    },
                ]);
            } catch (error) {
                console.log(error);
            }
        };

        if (
            lastSelectedOption?.__isNew__ &&
            !options.some((option) => option.value === lastSelectedOption.value)
        ) {
            fectchCreate();
        }
    }, [selectedOptions.length]);

    return (
        <>
            <CreatableSelect
                closeMenuOnSelect={true}
                value={selectedOptions}
                isMulti
                options={options}
                onChange={handleSelectChange}
                styles={{
                    control: (base) => ({
                        ...base,
                        fontSize: "0.8rem", // Thiết lập kích thước chữ cho control
                    }),

                    multiValueLabel: (base) => ({
                        ...base,
                        fontSize: "0.7rem", // Thiết lập kích thước chữ cho phần tử chứa giá trị đã chọn
                        padding: "0px 0px 0px 0px",
                        color: "#777777",
                    }),
                    dropdownIndicator: (base) => ({
                        ...base,
                        display: "none", // Ẩn dropdown indicator
                    }),
                    // Thiết lập style cho giá trị trong dropdown menu
                    option: (base) => ({
                        ...base,
                        fontSize: "0.7rem",
                        padding: "5px 10px", // Thiết lập kích thước chữ cho giá trị trong dropdown menu
                    }),
                }}
            />
        </>
    );
}
