import CreatableSelect from "react-select/creatable";
import { useEffect, useState } from "react";
import { ApiTag } from "../../services/Api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { postSelect, updatePostState } from "../../redux/modules/postSlice";
import { getTagsFetch, tagsSelect } from "../../redux/modules/tagSlice";

export default function OptionTag() {
    const dispatch = useAppDispatch();
    const post = useAppSelector(postSelect);
    const tags = useAppSelector(tagsSelect);
    const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
    const [options, setOptions] = useState<any[]>([]);

    useEffect(() => {
        if (tags.value.length === 0) {
            dispatch(getTagsFetch());
        }
        setOptions(
            tags.value.map((option) => ({
                _id: option._id,
                value: option.name,
                label: option.name,
            }))
        );
    }, [tags.value.length]);

    useEffect(() => {
        const targetIds = post.value[0]?.tagIds;

        if (targetIds?.length > 0 && targetIds[0].hasOwnProperty("_id")) {
            const filteredOptions = options.filter((option) =>
                targetIds.some((target) => target._id === option._id)
            );
            setSelectedOptions(filteredOptions);
        }
    }, [post.value[0]?.hasOwnProperty("tagIds"), options]);

    useEffect(() => {
        const lastSelectedOption = selectedOptions[selectedOptions.length - 1];
        const fectchCreate = async () => {
            try {
                const newTag = await ApiTag.createTag({
                    name: lastSelectedOption.value,
                });
                setOptions([
                    ...options,
                    {
                        _id: newTag._id,
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
    
    const handleSelectChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
        dispatch(
            updatePostState({
                ...post,
                tagIds: selectedOptions.map((option) => option._id),
            })
        );
    };
    return (
        <>
            <CreatableSelect
                closeMenuOnSelect={false}
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
                        padding: "5px 5px", // Thiết lập kích thước chữ cho giá trị trong dropdown menu
                    }),
                }}
            />
        </>
    );
}
