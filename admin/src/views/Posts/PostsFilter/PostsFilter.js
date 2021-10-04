
import React, { useState } from 'react';
import { usePostsUIContext } from '../../../components/Context/PostsContext'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { DatePicker, Space, Input, Select } from 'antd';
const { Option } = Select;
const { RangePicker } = DatePicker;

const PostsFilter = () => {



  const postsUIContext = usePostsUIContext();
  const postsUIProps = React.useMemo(() => {
    return {
      queryParams: postsUIContext.queryParams,
      setQueryParams: postsUIContext.setQueryParams,
      initialFilter: postsUIContext.initialFilter
    };
  }, [postsUIContext]);


  // article_title,
  //   username,
  //   category_name,
  //   status,
  //   startDate,
  //   endDate
  const searchAction = (values) => {
    let filter = {}
    const { article_title, startDate, endDate, username, category_name, status } = values
    let newQueryParams = { ...postsUIProps.queryParams }
    filter.article_title = article_title ?? ""
    filter.category_name = category_name ?? ""
    filter.status = status ?? ""
    filter.username = username ?? ""
    filter.startDate = startDate ?? ""
    filter.endDate = endDate ?? ""
    newQueryParams.filter = filter
    newQueryParams.pageNumber = 1
    postsUIProps.setQueryParams(newQueryParams)
  }

  return (

    <Formik
      initialValues={postsUIProps.initialFilter}
      onSubmit={(values) => {
        searchAction(values)
      }}>
      {({ handleSubmit, values, handleBlur, setFieldValue }) => (
        <>
          <Form className="form form-label-bottom">
            <div className="form-group row">
              <div className="col-lg-4">
                <Input
                  size='large'
                  name="article_title"
                  placeholder="Search Title"
                  onChange={(e) => {
                    setFieldValue("article_title", e.target.value);
                    handleSubmit()
                  }} />
              </div>
              <div className="col-lg-4">
                <Input
                  size='large'
                  name="username"
                  placeholder="Search By Original Poster"
                  onChange={(e) => {
                    setFieldValue("username", e.target.value);
                    handleSubmit()
                  }} />
              </div>

              <div className="col-lg-4">
                <RangePicker
                  size="large"
                  locale="id-ID"
                  // className="col-lg-12"
                  onChange={(date, dateString) => {
                    setFieldValue('startDate', dateString[0])
                    setFieldValue('endDate', dateString[1])
                    handleSubmit()
                  }}
                />

              </div>
            </div>
            <div className="form-group row">
              <div className="col-lg-4">
                <Select
                  name="status"
                  defaultValue="draft"
                  className="col-12"
                  size="large"
                  allowClear
                  onChange={(e) => {
                    setFieldValue("status", e);
                    handleSubmit()
                  }}
                >
                  <Option value="draft">Draft</Option>
                  <Option value="publish">Publish</Option>
                </Select>
              </div>
              <div className="col-lg-4">
                <Input
                  size='large'
                  name="category_name"
                  placeholder="Search Category Name"
                  onChange={(e) => {
                    setFieldValue("category_name", e.target.value);
                    handleSubmit()
                  }} />
              </div>
            </div>

          </Form>
        </>
      )
      }
    </Formik >

  )
}

export default PostsFilter