import { ErrorMessage, useField } from "formik";
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import CreatableSelect from "react-select/creatable";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { DatePicker, TimePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["link", "image"],
    ["table"],
    ["clean"],
  ],
  table: true,
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "indent",
  "link",
  "image",
  "color",
  "background",
  "align",
  "table",
];

const CustomInput = ({
  label, type, placeholder, options = [], name, isMulti = false, rightElement, autoComplete,
  timeFormat24 = true, required = false, ...props
}) => {
  const [field, meta, helpers] = useField({ name, type, ...props });
  const [isFocused, _] = useState(false);
  const [customOptions, setCustomOptions] = useState([]);
  const quillRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem(name + "_options");
    if (stored) {
      setCustomOptions(JSON.parse(stored));
    } else {
      setCustomOptions(options);
    }
  }, [name]);

  const handleAddOption = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };
    const updated = [...customOptions, newOption];
    setCustomOptions(updated);
    localStorage.setItem(name + "_options", JSON.stringify(updated));

    helpers.setValue(isMulti ? [...(field.value || []), inputValue] : inputValue);
  };

  const getTableModule = () => {
    const quill = quillRef.current?.getEditor?.();
    return quill?.getModule?.("table");
  };

  const focusEditor = () => quillRef.current?.getEditor?.().focus();

  const renderField = () => {
    switch (type) {
      case "description":
        return (
          <div className={`rounded-lg border-[1.5px] description ${meta.touched && meta.error ?
            'border-[#FF0000]! dark:border-[#FF0000]!' : isFocused ? 'border-blue-700 dark:border-blue-700' :
              'border-[#A3A3A3] dark:border-form-strokedark'}`}
          >
            <div className="flex flex-wrap gap-2 p-2 border-b border-[#A3A3A3] dark:border-form-strokedark">
              <button type="button" className="px-2 py-1 text-sm border rounded" onClick={() => {
                focusEditor();
                getTableModule()?.insertRowBelow?.();
              }}>
                + Row Below
              </button>

              <button type="button" className="px-2 py-1 text-sm border rounded" onClick={() => {
                focusEditor();
                getTableModule()?.insertColumnRight?.();
              }}>
                + Col Right
              </button>

              <button type="button" className="px-2 py-1 text-sm border rounded" onClick={() => {
                focusEditor();
                getTableModule()?.deleteRow?.();
              }}>
                Delete Row
              </button>

              <button type="button" className="px-2 py-1 text-sm border rounded" onClick={() => {
                focusEditor();
                getTableModule()?.deleteColumn?.();
              }}>
                Delete Col
              </button>
            </div>

            <ReactQuill ref={quillRef} theme="snow" value={field.value} placeholder={placeholder}
              modules={quillModules} formats={quillFormats} onBlur={() => helpers.setTouched(true)}
              onChange={(val) => {
                const clean = val.replace(/<(.|\n)*?>/g, "").trim();
                const hasImage = /<img\s+[^>]*src=/.test(val);
                const hasTable = /<table|<tr|<td/.test(val);
                const hasEmbed = /<iframe|<video|<audio/.test(val);
                helpers.setValue(!clean && !hasImage && !hasTable && !hasEmbed ? "" : val);
              }}
              style={{ minHeight: 220 }}
            />

            <style>{`
              .ql-editor table { border-collapse: collapse; width: 100%; }
              .ql-editor table td, .ql-editor table th {
                border: 1px solid #A3A3A3; padding: 6px 8px;
              }
              .ql-editor table th { background-color: #f8fafc; font-weight: 600; }
            `}</style>

            {/* <ReactQuill theme="snow" value={field.value} placeholder={placeholder}
              modules={quillModules} formats={quillFormats} onBlur={() => helpers.setTouched(true)}
              // onChange={(val) => {
              //     helpers.setValue(val);
              // }}
              onChange={(val) => {
                const clean = val.replace(/<(.|\n)*?>/g, "").trim();
                const hasImage = /<img\s+[^>]*src=/.test(val);
                const hasTable = /<table|<tr|<td/.test(val);
                const hasEmbed = /<iframe|<video|<audio/.test(val);

                if (!clean && !hasImage && !hasTable && !hasEmbed) {
                  helpers.setValue("");
                } else {
                  helpers.setValue(val);
                }
              }}
            /> */}
          </div>
        );
      case "select":
        return (
          <CreatableSelect isMulti={false} options={customOptions}
            value={customOptions.find((opt) => opt.value === field.value) || null}
            onChange={(opt) => helpers.setValue(opt ? opt.value : "")}
            onCreateOption={handleAddOption} placeholder={placeholder}
            classNames={{
              control: (state) => `!min-h-[41px] w-full !rounded-lg border-[1.5px] bg-transparent text-black 
                dark:bg-form-input dark:text-white ${meta.touched && meta.error ? "!border-[#FF0000] dark:!border-[#FF0000]" :
                  state.isFocused ? "border-blue-700! dark:border-blue-700!" : "!border-[#A3A3A3]"}`,
              placeholder: () => "text-gray-400",
              input: () => "text-black dark:text-white",
              singleValue: () => "text-black dark:text-white",
              menu: () => "bg-white dark:bg-form-input text-black dark:text-white rounded-lg shadow-lg mt-1",
              option: (state) => `px-3 py-2 cursor-pointer ${state.isFocused ? "bg-blue-100 dark:bg-blue-700" :
                ""} ${state.isSelected ? "bg-blue-500 text-white" : ""}`,
            }}
          />
        );
      case "multiselect":
        return (
          <CreatableSelect isMulti options={customOptions}
            value={customOptions.filter((opt) => field.value?.includes(opt.value))}
            onChange={(opt) => helpers.setValue(opt ? opt.map((o) => o.value) : [])}
            onCreateOption={handleAddOption} placeholder={placeholder}
            classNames={{
              control: (state) => `!min-h-[41px] w-full !rounded-lg border-[1.5px] bg-transparent text-black 
                dark:bg-form-input dark:text-white ${meta.touched && meta.error ? "border-[#FF0000]! dark:border-[#FF0000]!" :
                  state.isFocused ? "border-blue-700! dark:border-blue-700!" : "!border-[#A3A3A3]"}`,
              placeholder: () => "text-gray-400",
              option: (state) =>
                `px-3 py-2 cursor-pointer ${state.isFocused ? "bg-blue-100 dark:bg-blue-700" : ""} 
                ${state.isSelected ? "bg-blue-500 text-white" : ""}`,
            }}
          />
        );
      case "phone":
        return (
          <PhoneInput country={"in"} value={field.value}
            onChange={(val) => helpers.setValue(val)} placeholder={placeholder}
            onBlur={() => helpers.setTouched(true)}
            inputClass={`!w-full !rounded-lg !border-[1.5px] !py-2.5 !min-h-[41px] bg-transparent text-black outline-none
              transition focus:!border-blue-700 active:!border-blue-700 ps-3 disabled:cursor-default disabled:bg-gray-500 
              dark:bg-form-input dark:focus:border-blue-700 dark:text-white  ${meta.touched && meta.error ?
                '!border-[#FF0000] dark:!border-[#FF0000]' : '!border-[#A3A3A3] dark:border-form-strokedark'}`}
          />
        );
      case "date":
        return (
          <DatePicker value={field.value ? new Date(field.value) : null}
            onChange={(date) =>
              helpers.setValue(date ? date.toISOString().split("T")[0] : "")
            }
            onBlur={() => helpers.setTouched(true)} format="yyyy-MM-dd" placeholder={placeholder || "YYYY-MM-DD"}
            className={`w-full ${meta.touched && meta.error ? `[&_.rs-input-group]:border-[#FF0000]!
            dark:[&_.rs-input-group]:border-[#FF0000]!` : ""} focus:[&_.rs-input-group]:border-blue-700!`}
          />
        );
      case "datetime":
        return (
          <DatePicker value={field.value ? new Date(field.value) : null}
            onChange={(date) => {
              if (date) {
                const localDateTime = date.toISOString().split("T")[0] + " " + date.toTimeString().slice(0, 5);
                helpers.setValue(localDateTime);
              } else {
                helpers.setValue("");
              }
            }}
            onBlur={() => helpers.setTouched(true)}
            format="yyyy-MM-dd HH:mm" placeholder={placeholder} showMeridian={!timeFormat24}
            className={`w-full ${meta.touched && meta.error ? `[&_.rs-input-group]:border-[#FF0000]!
            dark:[&_.rs-input-group]:border-[#FF0000]!` : ""} focus:[&_.rs-input-group]:border-blue-700!`}
          />
        );
      case "time":
        return (
          <TimePicker value={field.value ? new Date(`1970-01-01T${field.value}:00`) : null}
            onChange={(val) =>
              helpers.setValue(val ? val.toTimeString().slice(0, 5) : "")
            }
            onBlur={() => helpers.setTouched(true)} format={timeFormat24 ? "HH:mm" : "hh:mm aa"} placeholder={placeholder}
            className={`w-full ${meta.touched && meta.error ? `[&_.rs-input-group]:border-[#FF0000]!
            dark:[&_.rs-input-group]:border-[#FF0000]!` : ""} focus:[&_.rs-input-group]:border-blue-700!`}
          />
        );
      default:
        return (
          <div className="relative flex items-center">
            <input id={name} type={type} placeholder={placeholder}{...field} className={`w-full rounded-lg border-[1.5px] py-2.5
              bg-transparent text-black outline-none transition focus:border-blue-700 ps-3 active:border-blue-700 
              disabled:cursor-default disabled:bg-gray-500 dark:bg-form-input dark:focus:border-blue-700 dark:text-white 
              ${meta.touched && meta.error ? `border-[#FF0000] dark:border-[#FF0000]` :
                'border-[#A3A3A3] dark:border-form-strokedark'}`}
              autoComplete={autoComplete}
            />

            {rightElement && (
              <div className="absolute right-2 flex items-center">
                {rightElement}
              </div>
            )}
          </div>

          // <input type={type} placeholder={placeholder} {...field} className={`w-full rounded-lg border-[1.5px] py-2.5 
          //     bg-transparent text-black outline-none transition focus:border-blue-700 active:border-blue-700 
          //     ps-3 disabled:cursor-default disabled:bg-gray-500 dark:bg-form-input dark:focus:border-blue-700
          //     dark:text-white  ${meta.touched && meta.error ? 'border-[#FF0000] dark:border-[#FF0000]'
          //         : 'border-[#A3A3A3] dark:border-form-strokedark'}`}
          // />
        )
    }
  };

  return (
    <div>
      <label className="mb-1 block text-[#111827] inter_medium dark:text-white">
        {label} {required && <span className="text-[#dc3545]">*</span>}
      </label>
      {renderField()}
      <ErrorMessage component="div" name={field.name} className="text-base text-red-600 inter mt-1" />
    </div>
  );
};

export default CustomInput