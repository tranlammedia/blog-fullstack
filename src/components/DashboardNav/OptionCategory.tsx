import CreatableSelect from "react-select/creatable";
import { useEffect, useState } from "react";
import { ApiCategory } from "../../services/Api";
import { postSelect, updatePostState } from "../../redux/modules/postSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
    categoriesSelect,
    getCategoriesFetch,
} from "../../redux/modules/categorySlice";

export default function OptionCategory() {
    const dispatch = useAppDispatch();
    const post = useAppSelector(postSelect);
    const categories = useAppSelector(categoriesSelect);
    const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
    const [options, setOptions] = useState<any[]>([]);
    useEffect(() => {
        if (categories.value.length === 0) {
            dispatch(getCategoriesFetch());
        }
        setOptions(
            categories.value.map((option) => ({
                _id: option._id,
                value: option.name,
                label: option.name,
            }))
        );
    }, [categories.value.length]);
    
    useEffect(() => {
        const targetIds = post.value[0]?.categoryIds || [];

        const filteredOptions = options.filter(option => {
            if (targetIds.length > 0) {
                if (targetIds[0]?.hasOwnProperty("_id")) {
                    return targetIds.some(target => target._id === option._id);
                } else {
                    return targetIds.some(target => target === option._id);
                }
            }
            return false;
        });
        
        setSelectedOptions(filteredOptions);
    }, [post.value[0]?.hasOwnProperty("categoryIds"), options]);

    useEffect(() => {
        const lastSelectedOption = selectedOptions[selectedOptions.length - 1];
        const fectchCreate = async () => {
            try {
                const newCategory = await ApiCategory.createCategory({
                    name: lastSelectedOption.value,
                });

                await setOptions([
                    ...options,
                    {
                        _id: newCategory._id,
                        ...lastSelectedOption,
                    },
                ]);

                await dispatch(
                    updatePostState({
                        categoryIds: [...post.value[0].categoryIds, newCategory._id],
                    })
                );
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
    }, [selectedOptions?.length]);

    const handleSelectChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
        dispatch(
            updatePostState({
                categoryIds: selectedOptions.map((option) => option._id),
            })
        );
    };

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
